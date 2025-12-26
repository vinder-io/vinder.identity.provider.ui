import { useState } from "react";
import { PermissionsTable } from "./permissions-table";
import { Pagination } from "@/application/components/ui/pagination";
import { usePermissionsPagination } from "../hooks/use-permissions-pagination";
import { RegisterPermissionButton } from "./register-permission-button";
import { RegisterPermissionForm } from "./register-permission-form";
import { EditPermissionForm } from "./edit-permission-form";
import { DeletePermissionDialog } from "./delete-permission-dialog";
import { useCreatePermissionMutation, permissionCreationSchema } from "@/hooks/mutations/use-create-permission";
import { useUpdatePermissionMutation, permissionEditSchema } from "@/hooks/mutations/use-update-permission";
import { useDeletePermissionMutation } from "@/hooks/mutations/use-delete-permission";
import { useQueryClient } from "@tanstack/react-query";

const styles = {
  container: "max-w-4xl mx-auto py-10",
  heading: "text-2xl font-semibold text-foreground mb-2",
  subheading: "text-base text-muted-foreground mb-8",
};

export function PermissionsContent() {
  const {
    permissions,
    page,
    pageSize,
    total,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    setPage,
  } = usePermissionsPagination();

  const queryClient = useQueryClient();
  const createPermission = useCreatePermissionMutation({
    onSuccess: () => {
      setOpen(false);
      setForm({ name: "", description: "" });
      setTouched({ name: false, description: false });
      setErrors({ name: undefined, description: undefined });
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (error: any) => {
      if (error && typeof error === "object" && error.errors) {
        setErrors(error.errors);
      }
    },
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [touched, setTouched] = useState({ name: false, description: false });
  const [errors, setErrors] = useState({ name: undefined, description: undefined });

  const handleRegister = () => {
    const result = permissionCreationSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      setTouched({ name: true, description: true });
      return;
    }
    createPermission.mutate(form);
  };

  const handleChange = (field: any, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: any) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ id: "", name: "", description: "" });
  const [editTouched, setEditTouched] = useState({ name: false, description: false });
  const [editErrors, setEditErrors] = useState({ name: undefined, description: undefined });

  const updatePermission = useUpdatePermissionMutation({
    onSuccess: () => {
      setEditOpen(false);
      setEditForm({ id: "", name: "", description: "" });
      setEditTouched({ name: false, description: false });
      setEditErrors({ name: undefined, description: undefined });
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (error: any) => {
      if (error && typeof error === "object" && error.errors) {
        setEditErrors(error.errors);
      }
    },
  });

  const handleEdit = (permission: any) => {
    setEditForm(permission);
    setEditTouched({ name: false, description: false });
    setEditErrors({ name: undefined, description: undefined });
    setEditOpen(true);
  };

  const handleEditChange = (field: any, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEditBlur = (field: any) => {
    setEditTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleEditSubmit = () => {
    const result = permissionEditSchema.safeParse(editForm);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setEditErrors(fieldErrors);
      setEditTouched({ name: true, description: true });
      return;
    }
    updatePermission.mutate({ id: editForm.id, data: editForm });
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const deletePermission = useDeletePermissionMutation({
    onSuccess: () => {
      setDeleteOpen(false);
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });

  const handleDelete = (permission: { id: string; name: string }) => {
    setDeleteTarget(permission);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deletePermission.mutate(deleteTarget.id);
    }
  };

  return (
    <div className={styles.container}>
      <div className="flex items-center justify-between mb-8">
        <h1 className={styles.heading}>Manage your permissions</h1>
        <RegisterPermissionButton onClick={() => setOpen(true)} />
      </div>
      <p className={styles.subheading}>
        Here you can view, create, and manage all the permissions available in
        your system. Use the table below to explore existing permissions or add
        new ones as needed.
      </p>
      <PermissionsTable permissions={permissions} onEdit={handleEdit} onDelete={handleDelete} />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={setPage}
      />
      <RegisterPermissionForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleRegister}
        loading={loading}
        value={form}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <EditPermissionForm
        open={editOpen}
        onOpenChange={setEditOpen}
        value={editForm}
        onChange={handleEditChange}
        onBlur={handleEditBlur}
        onSubmit={handleEditSubmit}
        errors={editErrors}
        touched={editTouched}
        loading={updatePermission.status === "pending"}
      />
      <DeletePermissionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        loading={deletePermission.status === "pending"}
        permissionName={deleteTarget?.name}
      />
    </div>
  );
}
