import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { PermissionCreationScheme } from "@/types/permissions/permission-creation-scheme";

interface RegisterPermissionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: PermissionCreationScheme;
  errors?: Partial<Record<keyof PermissionCreationScheme, string>>;
  touched?: { name: boolean; description: boolean };
  loading?: boolean;
  onChange: (field: keyof PermissionCreationScheme, value: string) => void;
  onBlur: (field: keyof PermissionCreationScheme) => void;
  onSubmit: () => void;
}

export function RegisterPermissionForm({
  open,
  onOpenChange,
  value,
  errors = {},
  touched = { name: false, description: false },
  loading,
  onChange,
  onBlur,
  onSubmit,
}: Readonly<RegisterPermissionFormProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full p-6">
        <form onSubmit={e => { e.preventDefault(); onSubmit(); }} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Register new permission</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={value.name}
                onChange={e => onChange("name", e.target.value)}
                onBlur={() => onBlur("name")}
                required
                autoFocus
                minLength={3}
                maxLength={64}
                placeholder="Permission name"
                className={`w-full rounded-md border-2 px-3 py-2 text-base bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all ${touched.name && errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-primary"}`}
              />
              {touched.name && errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="description" className="block text-sm font-medium text-primary mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={value.description ?? ""}
                onChange={e => onChange("description", e.target.value)}
                onBlur={() => onBlur("description")}
                maxLength={256}
                placeholder="Describe what this permission allows (optional)"
                rows={3}
                className={`w-full rounded-md border-2 px-3 py-2 text-base bg-background resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all ${touched.description && errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-primary"}`}
              />
              {touched.description && errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description}</p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
