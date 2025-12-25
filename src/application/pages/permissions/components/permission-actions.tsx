import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface PermissionActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function PermissionActions({ onEdit, onDelete }: Readonly<PermissionActionsProps>) {
  return (
    <div className="flex gap-2">
      <Button type="button" size="icon" variant="ghost" aria-label="Editar permissão" onClick={onEdit}>
        <Pencil className="w-4 h-4 text-zinc-500 hover:text-zinc-700" />
      </Button>
      <Button type="button" size="icon" variant="ghost" aria-label="Deletar permissão" onClick={onDelete}>
        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
      </Button>
    </div>
  );
}
