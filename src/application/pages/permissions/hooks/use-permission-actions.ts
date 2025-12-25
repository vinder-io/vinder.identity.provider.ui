import type { Permission } from "@/types/identity/permission";

export function usePermissionActions() {
  const handleEdit = (permission: Permission) => {
    console.log("Edit permission:", permission);
  };

  const handleDelete = (permission: Permission) => {
    console.log("Delete permission:", permission);
  };

  return { handleEdit, handleDelete };
}
