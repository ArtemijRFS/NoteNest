"use client";
import { Button } from "@/components/ui/button";

type AddButtonProps = {
    label?: string;
    onClick?: () => void;
};

export default function AddButton({ label = "Add", onClick }: AddButtonProps) {
    return (
        <Button className="bg-green-400 w-full" onClick={onClick}>
            {label}
        </Button>
    );
}
