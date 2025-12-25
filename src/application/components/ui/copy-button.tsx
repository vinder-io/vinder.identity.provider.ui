import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

interface CopyButtonProps {
    value: string;
    className?: string;
}

export function CopyButton({ value, className }: Readonly<CopyButtonProps>) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        await navigator.clipboard.writeText(value);

        setCopied(true);

        toast.success("text copied to clipboard");

        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <Button
            type="button"
            size="icon"
            variant="ghost"
            className={cn("ml-1", className)}
            onClick={handleCopy}
            tabIndex={-1}
            aria-label="Copiar"
        >
            <Copy className={cn("w-4 h-4", copied ? "text-green-400" : "text-zinc-700")}/>
        </Button>
    );
}
