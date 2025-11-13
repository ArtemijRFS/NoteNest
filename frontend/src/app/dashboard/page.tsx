"use client"
import { Button } from "@/components/ui/button";
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
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { 
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
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
                                <NavigationMenuTrigger className="font-medium">Username</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink className="whitespace-nowrap px-4 py-2 text-red-500 hover:bg-red-100">
                                        Sign Out
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            {/* Cards */}
            <div className="flex justify-between gap-6 px-6 py-10">
                {/* Notes */}
                <Card className="w-full max-w-2xl bg-gray-100">
                    <CardHeader>
                        <CardTitle className="text-2xl">Notes</CardTitle>
                        <CardDescription>Displays your created notes for project / projects</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">

                        {/* Users Notes */}
                         <Card>
                            <div className="px-6 py-4 grid gap-2">
                                <Label htmlFor="note-text">Note</Label>
                                <Input type="text" id="note-txt" placeholder="Set Backend" disabled />
                            </div>
                            <div className="px-6 py-4 grid gap-2">
                                <Label htmlFor="prj-desc">Notes Project</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selected Project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Your Projects</SelectLabel>
                                            <SelectItem value="note-nest">Note Nest</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </Card>

                        <Card>
                            <div className="px-6 py-4 grid gap-2">
                                <Label htmlFor="note-text">Note</Label>
                                <Input type="text" id="note-txt" placeholder="Set Backend" disabled />
                            </div>
                            <div className="px-6 py-4 grid gap-2">
                                <Label htmlFor="prj-desc">Notes Project</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selected Project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Your Projects</SelectLabel>
                                            <SelectItem value="note-nest">Note Nest</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </Card>

                    </CardContent>
                    <CardFooter>
                        <div className="flex items-center justify-between w-full">
                            <Button type="submit" className="bg-amber-400">Edit</Button>
                            <Button type="submit" className="bg-red-400">Delete</Button>
                        </div>
                    </CardFooter>
                </Card>

                {/* Projects */}
                <Card className="w-full max-w-2xl bg-gray-100">
                    <CardHeader>
                        <CardTitle className="text-2xl">Projects</CardTitle>
                        <CardDescription>Displays your created projects</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">

                        {/* Users Projects */}
                        <Card>
                            <div className="px-6 py-4 grid gap-2">
                                <Label htmlFor="prj-name">Project Name</Label>
                                <Input type="text" id="prj-name" placeholder="Notes Nest" disabled />
                            </div>
                            <div className="px-6 py-4 grid gap-2">
                                <Label htmlFor="prj-desc">Description</Label>
                                <Input type="text" id="prj-desc" placeholder="Create a simple app" disabled />
                            </div>
                        </Card>

                        <Card>
                            <div className="px-6 py-4 grid gap-2">
                                <Label htmlFor="prj-name">Project Name</Label>
                                <Input type="text" id="prj-name" placeholder="Notes Nest" disabled />
                            </div>
                            <div className="px-6 py-4 grid gap-2">
                                <Label htmlFor="prj-desc">Description</Label>
                                <Input type="text" id="prj-desc" placeholder="Create a simple app" disabled />
                            </div>
                        </Card>

                    </CardContent>
                    <CardFooter>
                        <div className="flex items-center justify-between w-full">
                            <Button type="submit" className="bg-amber-400">Edit</Button>
                            <Button type="submit" className="bg-red-400">Delete</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}