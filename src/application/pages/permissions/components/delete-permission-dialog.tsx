import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeletePermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
  permissionName?: string;
}

export function DeletePermissionDialog({
  open,
  onOpenChange,
  onConfirm,
  loading,
  permissionName,
}: Readonly<DeletePermissionDialogProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full p-0 overflow-hidden rounded-lg border border-border bg-background shadow-xl">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-lg font-semibold text-primary">Delete permission</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4 text-base text-foreground">
          Are you sure you want to delete the permission{" "}
          <span className="font-semibold text-primary">{permissionName}</span>? This action cannot be undone.
        </div>
        <DialogFooter className="px-6 pb-6 flex flex-row gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading} className="w-1/2">
            Cancel
          </Button>
          <Button type="button" variant="default" onClick={onConfirm} disabled={loading} className="w-1/2">
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
