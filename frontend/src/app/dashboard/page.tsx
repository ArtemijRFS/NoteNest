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
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ProjectDialog from "@/components/cards/popups/ProjectDialog";
import NoteDialog from "@/components/cards/popups/NoteDialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const projects = [];
    const [username, setUsername] = useState<string | null>(null);
    const [openProjectDialog, setOpenProjectDialog] = useState(false);
    const [openNoteDialog, setOpenNoteDialog] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    useEffect(() => {
        const loadUsername = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsed = JSON.parse(storedUser);
                    setUsername(parsed.username || null);
                } catch {
                    setUsername(null);
                }
            }
        };
        loadUsername();
    }, []);

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
                                    {username ? `Hello, ${username}` : "User"}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <Button variant={"ghost"} className="whitespace-nowrap px-4 py-2 text-red-500 hover:bg-red-100" onClick={handleLogout}>
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
                    <CardContent className=
                        {`flex ${
                            projects.length === 0 ? "flex-row justify-evenly" : "flex-col items-center"
                        } gap-6`}
                    >
                        <p className="text-red-500 text-center">No notes</p>
                        {projects.length === 0 && (
                            <p className="text-red-500 text-center">No project to select</p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button className="bg-green-400 w-full" disabled={projects.length === 0}>
                            {projects.length === 0 ? "Cannot create note without Project" : "Create Note"}
                        </Button>
                        <NoteDialog open={openNoteDialog} onOpenChange={setOpenNoteDialog} />
                    </CardFooter>
                </Card>

                {/* Projects */}
                <Card className="w-full max-w-2xl bg-gray-100 flex flex-col gap-10">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Projects</CardTitle>
                        <CardDescription className="text-center">Your projects will appear here</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <p className="text-red-500 text-center">No projects</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="bg-green-400 w-full" onClick={() => setOpenProjectDialog(true)}>Create Project</Button>
                        <ProjectDialog open={openProjectDialog} onOpenChange={setOpenProjectDialog} />
                    </CardFooter>
                </Card>
                
            </div>

        </div>
    );
}