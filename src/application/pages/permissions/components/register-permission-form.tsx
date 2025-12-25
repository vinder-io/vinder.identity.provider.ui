import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { PermissionCreationScheme } from "@/types/permissions/permission-creation-scheme";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z
    .string()
    .min(3, "name must be at least 3 characters.")
    .max(64, "name must be at most 64 characters.")
    .nonempty("name is required."),
  description: z
    .string()
    .max(256, "description must be at most 256 characters.")
    .optional()
    .or(z.literal(""))
});

type FormState = z.infer<typeof schema>;

interface RegisterPermissionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PermissionCreationScheme) => void;
  loading?: boolean;
}

export function RegisterPermissionForm({ open, onOpenChange, onSubmit, loading }: Readonly<RegisterPermissionFormProps>) {
  const [form, setForm] = useState<FormState>({ name: "", description: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [touched, setTouched] = useState<{ name: boolean; description: boolean }>({ name: false, description: false });

  const validateField = (field: keyof FormState, value: string) => {
    try {
      schema.pick({ [field]: true }).parse({ [field]: value });
      return undefined;
    } catch (err) {
      if (err instanceof z.ZodError) {
        return err.issues[0]?.message;
      }
      return "Invalid value.";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormState, value) }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormState, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = schema.parse(form);
      setErrors({});
      setTouched({ name: true, description: true });
      onSubmit(parsed);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormState, string>> = {};
        err.issues.forEach((error) => {
          const field = error.path[0] as keyof FormState;
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
        setTouched({ name: true, description: true });
      }
    }
  };

  const hasErrors = !!errors.name || !!errors.description;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Register new permission</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoFocus
                className={`mt-1 ${errors.name && touched.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                minLength={3}
                maxLength={64}
                placeholder="Permission name"
              />
              {errors.name && touched.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 resize-none ${errors.description && touched.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                maxLength={256}
                placeholder="Describe what this permission allows (optional)"
                rows={3}
              />
              {errors.description && touched.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description}</p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={loading || hasErrors}
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
