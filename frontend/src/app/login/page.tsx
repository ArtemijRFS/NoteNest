"use client"
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardHeader, 
    CardTitle,
    CardDescription,
    CardAction,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/lib/hooks/useLogin";

export default function Login() {
    const { login, loading, error } = useLogin();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        login({ email, password });
    }
    
    return (
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Login to your account</CardTitle>
                        <CardDescription>Enter your credentials below to login to your account</CardDescription>
                        <CardAction>
                            <Button variant={"outline"} onClick={() => router.push("/signup")}>Go to Sign up</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="example@example.com" required defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="*****" required defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-5">
                        <Button type="submit" className="w-full">
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                        {error && (
                            <p className="text-xl text-red-500 text-center pb-4">{error}</p>
                        )}
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}