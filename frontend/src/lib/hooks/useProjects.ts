"use client";
import { useState, useEffect, useCallback } from "react";

interface Project {
    _id: string;
    title: string;
    description: string;
    userId: string;
    createdAt: string;
}

export function useProjects(token: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/projects", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to fetch projects");
            setProjects(result.projects);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    async function createProject(title: string, description: string) {
        try {
            const res = await fetch("http://localhost:5000/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create project");
            setProjects(prev => [...prev, result.project]);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        }
    }

    async function updateProject(id: string, title: string, description: string) {
        try {
            const res = await fetch(`http://localhost:5000/projects/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to update project");

            setProjects(prev =>
                prev.map(p => (p._id === id ? result.project : p))
            );
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        }
    }

    async function deleteProject(id: string) {
        try {
        await fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
            setProjects(prev => prev.filter(p => p._id !== id));
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        }
    }

    return {
        projects,
        loading,
        error,
        createProject,
        updateProject,
        deleteProject,
        refreshProjects: fetchProjects,
    };
}
