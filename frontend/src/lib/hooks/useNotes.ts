"use client";
import { useState, useEffect, useCallback } from "react";

interface Note {
    _id: string;
    text: string;
    project: string;
    userId: string;
    createdAt: string;
}

export function useNotes(token: string, projectId?: string) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const url = projectId
                ? `http://localhost:5000/notes?project=${projectId}`
                : "http://localhost:5000/notes";

            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to fetch notes");
            setNotes(result.notes);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    }, [token, projectId]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    async function createNote(text: string, project: string) {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text, project, createdAt: new Date().toISOString() }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create note");
            setNotes(prev => [...prev, result.note]);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to create note");
        } finally {
            setLoading(false);
        }
    }

    async function updateNote(id: string, text: string, project: string) {
        try {
            const res = await fetch(`http://localhost:5000/notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text, project }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to update note");
            setNotes(prev => prev.map(n => (n._id === id ? result.note : n)));
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        }
    }

    async function deleteNote(id: string) {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/notes/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message || "Failed to delete note");
            }
            setNotes(prev => prev.filter(n => n._id !== id));
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to delete note");
        } finally {
            setLoading(false);
        }
    }

    return {
        notes,
        loading,
        error,
        createNote,
        updateNote,
        deleteNote,
        refreshNotes: fetchNotes,
    };
}
