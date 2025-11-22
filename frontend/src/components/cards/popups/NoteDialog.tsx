"use client";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AddButton from "../buttons/AddButton";
import DeleteButton from "../buttons/DeleteButton";
import { useNotes } from "@/lib/hooks/useNotes";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

type NoteDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectId: string | null;
    noteId: string | null;
    token: string;
};

export default function NoteDialog({ open, onOpenChange, projectId, noteId, token }: NoteDialogProps) {
  const {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote
  } = useNotes(token, projectId || undefined);

  const found = noteId ? notes.find(n => String(n._id) === String(noteId)) : null;

  const dialogKey = open ? (noteId ? `edit-${noteId}` : "create-new") : "closed";

  const [noteText, setNoteText] = useState(found?.text ?? "");
  const isCreatingNewNote = !noteId;

  const handleCreate = () => {
    if (projectId && noteText.trim()) {
      createNote(noteText, projectId);
      resetAndClose();
    }
  };

  const handleUpdate = () => {
    if (noteId && noteText.trim() && projectId) {
      updateNote(noteId, noteText, projectId);
      resetAndClose();
    }
};

  const handleDelete = () => {
    if (noteId) {
      deleteNote(noteId);
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setNoteText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent key={dialogKey} className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isCreatingNewNote ? "Notes" : "Update your note"}
          </DialogTitle>
          <DialogDescription>
            {isCreatingNewNote
              ? "Create a new note"
              : "Edit your note"}
          </DialogDescription>
        </DialogHeader>

        <Card className="w-full bg-gray-100 flex flex-col gap-8">
          <CardContent className="flex flex-col gap-6">
            <div className="px-6 py-4 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="note-content">Text</Label>
                <Input
                  type="text"
                  id="note-content"
                  placeholder={isCreatingNewNote ? "Enter a new note" : "Edit note"}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              </div>
            </div>

            {loading && (
              <p className="text-center text-sm text-gray-500">Loading...</p>
            )}
            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4 w-full">
            {isCreatingNewNote ? (
              <AddButton label="Save Note" onClick={handleCreate} />
            ) : (
              <>
                <AddButton label="Save Changes" onClick={handleUpdate} />
                <DeleteButton onClick={handleDelete} />
              </>
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
