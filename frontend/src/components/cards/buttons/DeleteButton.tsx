"use client";
import { Button } from "@/components/ui/button";

type DeleteButtonProps = {
    label?: string;
    onClick?: () => void;
};

export default function DeleteButton({ label = "Delete", onClick }: DeleteButtonProps) {
    return (
        <Button className="bg-red-400 w-full" onClick={onClick}>
            {label}
        </Button>
    );
}
