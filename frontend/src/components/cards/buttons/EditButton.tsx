"use client";
import { Button } from "@/components/ui/button";

type EditButtonProps = {
    label?: string;
    onClick?: () => void;
};

export default function EditButton({ label = "Edit", onClick }: EditButtonProps) {
    return (
        <Button className="bg-yellow-400 w-full" onClick={onClick}>
            {label}
        </Button>
    );
}
