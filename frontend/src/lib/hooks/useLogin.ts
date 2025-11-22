"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginData {
    email: string;
    password: string;
}

export function useLogin(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function login(data: LoginData) {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                })
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Login failed");
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            router.push("/dashboard");
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

    return { login, loading, error };
}