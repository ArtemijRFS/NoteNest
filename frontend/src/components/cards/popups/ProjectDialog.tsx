"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import Projects from "../Projects";

type ProjectDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function ProjectDialog({ open, onOpenChange }: ProjectDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                    <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new project
                    </DialogDescription>
                    </DialogHeader>
                    <Projects />
            </DialogContent>
        </Dialog>
    );
}
