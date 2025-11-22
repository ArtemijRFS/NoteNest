"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl text-black font-extrabold m-10">Note Nest</h1>
      <Button variant={"ghost"} size={"lg"} onClick={() => router.push("/signup")}>Click here to continue</Button>
    </div>
  );
}
