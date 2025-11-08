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

export default function Login() {
    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Login to your account</CardTitle>
                    <CardDescription>Enter your credentials below to login to your account</CardDescription>
                    <CardAction>
                        <Button variant={"outline"}>Go to Sign up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form action="submit">
                        <div className="flex flex-col gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="example@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="pswrd">Password</Label>
                                <Input type="password" id="pswrd" placeholder="*****" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex gap-5">
                    <Button type="submit" className="w-full">Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
}