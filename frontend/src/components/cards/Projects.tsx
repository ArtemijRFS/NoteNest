"use client";
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AddButton from "./buttons/AddButton";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./DeleteButton";

export default function Projects() {
    return (
        <Card className="w-full max-w-2xl bg-gray-100 flex flex-col gap-8">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Projects</CardTitle>
                <CardDescription className="text-center">Displays your created project</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="px-6 py-4 grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="prj-title">Title</Label>
                        <Input type="text" id="prj-title" placeholder="Project's title" disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="prj-desc">Description</Label>
                        <Input type="text" id="prj-desc" placeholder="Project's description" disabled />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 w-full">
                <AddButton label="Add Project" />
                <EditButton />
                <DeleteButton />
            </CardFooter>
        </Card>
    );
}
