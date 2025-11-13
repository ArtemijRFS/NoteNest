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
import { useSignup } from "@/lib/hooks/useSignup";
import { useRouter } from "next/navigation";
    
export default function Signup() {
    const router = useRouter();
    const { signup, loading, error } = useSignup();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        signup({
            email: formData.get("email") as string,
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("password-confirm") as string,
        })
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-full max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>Enter your credentials below to create an account</CardDescription>
                        <CardAction>
                            <Button variant={"outline"} onClick={() => router.push("/login")}>Go to Login</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email" placeholder="example@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" placeholder="Example-123" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" placeholder="*****" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password-confirm">Confirm Password</Label>
                                <Input type="password" id="password-confirm" name="password-confirm" placeholder="*****" required />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-5">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing up..." : "Sign up"}
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