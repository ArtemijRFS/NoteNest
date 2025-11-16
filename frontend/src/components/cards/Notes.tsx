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
import { 
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem
} from "@/components/ui/select";
import AddButton from "./buttons/AddButton";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./DeleteButton";

export default function Notes() {
    return (
        <Card className="w-full max-w-2xl bg-gray-100 flex flex-col gap-8">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Notes</CardTitle>
                <CardDescription className="text-center">Displays your created notes for project / projects</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="px-6 py-4 grid gap-4">
                    <Label htmlFor="note-project">Notes Project</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Your Projects</SelectLabel>
                            <SelectItem value="note-nest">Note Nest</SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 w-full">
                <AddButton label="Add Note" />
                <EditButton />
                <DeleteButton />
            </CardFooter>
        </Card>
    );
}
