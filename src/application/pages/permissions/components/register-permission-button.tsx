import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

interface RegisterPermissionButtonProps {
  onClick?: () => void;
  className?: string;
}

export function RegisterPermissionButton({ onClick, className }: Readonly<RegisterPermissionButtonProps>) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={onClick}
      aria-label="Register new permission"
    >
      <KeyRound className="w-4 h-4 mr-2" />
      register new permission
    </Button>
  );
}
