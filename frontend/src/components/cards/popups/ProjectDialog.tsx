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
import { useProjects } from "@/lib/hooks/useProjects";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

type ProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string | null;
  token: string;
};

export default function ProjectDialog({ open, onOpenChange, projectId, token }: ProjectDialogProps) {
  const {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject
  } = useProjects(token);

  const found = projectId ? projects.find(p => p._id === projectId) : null;

  const dialogKey = open ? (projectId ? `edit-${projectId}` : "create-new") : "closed";

  const [title, setTitle] = useState(found?.title ?? "");
  const [description, setDescription] = useState(found?.description ?? "");
  const isCreatingNewProject = !projectId;

  const handleCreate = () => {
    if (title.trim()) {
      createProject(title, description);
      resetAndClose();
    }
  };

  const handleUpdate = () => {
    if (projectId && title.trim()) {
      updateProject(projectId, title, description);
      resetAndClose();
    }
  };

  const handleDelete = () => {
    if (projectId) {
      deleteProject(projectId);
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent key={dialogKey} className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isCreatingNewProject ? "Projects" : "Update your project"}
          </DialogTitle>
          <DialogDescription>
            {isCreatingNewProject
              ? "Create a new project"
              : "Edit your project"}
          </DialogDescription>
        </DialogHeader>

        <Card className="w-full bg-gray-100 flex flex-col gap-8">
          <CardContent className="flex flex-col gap-6">
            <div className="px-6 py-4 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prj-title">Title</Label>
                <Input
                  type="text"
                  id="prj-title"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prj-desc">Description</Label>
                <Input
                  type="text"
                  id="prj-desc"
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
            {isCreatingNewProject ? (
              <AddButton label="Save Project" onClick={handleCreate} />
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
