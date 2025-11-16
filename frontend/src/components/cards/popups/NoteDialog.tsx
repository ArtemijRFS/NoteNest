"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import Notes from "../Notes";

type NoteDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function NoteDialog({ open, onOpenChange }: NoteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                <DialogTitle>Create Note</DialogTitle>
                <DialogDescription>
                    Fill in the details below to add a new note
                </DialogDescription>
                </DialogHeader>
                <Notes />
            </DialogContent>
        </Dialog>
    );
}
