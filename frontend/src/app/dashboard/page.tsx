"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useNotes } from "@/lib/hooks/useNotes";
import { useProjects } from "@/lib/hooks/useProjects";
import ProjectDialog from "@/components/cards/popups/ProjectDialog";
import NoteDialog from "@/components/cards/popups/NoteDialog";

export default function Dashboard() {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const { projects, refreshProjects } = useProjects(token);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const { notes, refreshNotes } = useNotes(token, selectedProjectId ?? undefined);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [openProjectDialog, setOpenProjectDialog] = useState(false);
    const [openNoteDialog, setOpenNoteDialog] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (storedToken) setToken(storedToken);
            if (storedUser) {
                try {
                    const parsed = JSON.parse(storedUser);
                    setUsername(parsed.username ?? "");
                } catch {
                    setUsername("");
                }
            }
        }, 0);
    }, []);

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <div className="px-6 py-10">

            {/* Navigation */}
            <div className="w-full px-6 py-4 border-b-2 rounded-2xl">
                <div className="flex items-center justify-between w-full relative">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <h1 className="text-2xl font-extrabold text-black">Note Nest</h1>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu className="relative">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="font-medium">
                                    {username}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <Button
                                        variant="ghost"
                                        className="whitespace-nowrap px-4 py-2 text-red-500 hover:bg-red-100"
                                        onClick={handleLogout}
                                    >
                                        Sign Out
                                    </Button>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            {/* Content */}
            <div className="flex justify-between gap-6 px-6 py-10">

                {/* Notes */}
                <Card className="w-full max-w-2xl bg-gray-100 flex flex-col gap-10">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Notes</CardTitle>
                        <CardDescription className="text-center">Your notes will appear here</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        {selectedProjectId ? (
                            notes.length > 0 ? (
                                notes.map((n) => {
                                    const project = projects.find((p) => p._id === n.project);
                                    return (
                                        <Button
                                            key={n._id}
                                            className="w-full max-w-md bg-white shadow text-black py-4 px-6 text-left hover:bg-gray-200 flex justify-between items-center"
                                            onClick={() => {
                                                setSelectedNoteId(n._id);
                                                setOpenNoteDialog(true);
                                            }}
                                        >
                                            <span className="font-medium">{n.text}</span>
                                            <span className="text-sm text-gray-500">{project?.title ?? "Unknown Project"}</span>
                                        </Button>
                                    );
                                })
                            ) : (
                                <p className="text-red-500 text-center">No notes for this project</p>
                            )
                        ) : (
                            <p className="text-gray-500 text-center">Select a project to view notes</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button
                            className="bg-green-400"
                            disabled={!selectedProjectId}
                            onClick={() => {
                                setSelectedNoteId(null);
                                setOpenNoteDialog(true);
                            }}
                        >
                            {selectedProjectId
                                ? "Create Note"
                                : "Cannot create note without Project"}
                        </Button>
                        <NoteDialog
                            open={openNoteDialog}
                            onOpenChange={(open) => {
                                setOpenNoteDialog(open);
                                if (!open) refreshNotes();
                            }}
                            projectId={selectedProjectId}
                            noteId={selectedNoteId}
                            token={token}
                        />
                    </CardFooter>
                </Card>

                {/* Projects */}
                <Card className="w-full max-w-2xl bg-gray-100 flex flex-col gap-10">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Projects</CardTitle>
                        <CardDescription className="text-center">Your projects will appear here</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        {projects.length > 0 ? (
                            projects.map((p) => (
                                <Button
                                    key={p._id}
                                    className="w-full max-w-md bg-white shadow text-black text-center py-4 text-lg font-medium hover:bg-gray-200"
                                    onClick={() => {
                                        setSelectedProjectId(p._id);
                                        setOpenProjectDialog(true);
                                    }}
                                >
                                    {p.title}
                                </Button>
                            ))
                        ) : (
                            <p className="text-red-500 text-center">No projects</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button
                            className="bg-green-400"
                            onClick={() => {
                                setSelectedProjectId(null);
                                setOpenProjectDialog(true);
                            }}
                        >
                            Create Project
                        </Button>
                        <ProjectDialog
                            open={openProjectDialog}
                            onOpenChange={(open) => {
                                setOpenProjectDialog(open);
                                if (!open) refreshProjects();
                            }}
                            projectId={selectedProjectId}
                            token={token}
                        />
                    </CardFooter>
                </Card>

            </div>
            
        </div>
    );
}
