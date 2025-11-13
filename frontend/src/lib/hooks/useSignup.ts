"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignupData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export function useSignup(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function signup(data: SignupData) {
        if (data.password !== data.confirmPassword){
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({
                    email: data.email,
                    username: data.username,
                    password: data.password,
                })
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || "Signup failed");
            }
            router.push("/login")
        } catch(error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    return { signup, loading, error };
}