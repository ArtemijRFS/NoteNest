import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl text-black font-extrabold m-10">Note Nest</h1>
      <Button variant={"ghost"} size={"lg"}>Click here to continue</Button>
    </div>
  );
}
