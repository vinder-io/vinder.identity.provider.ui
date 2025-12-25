import { useState } from "react";
import { PermissionsTable } from "./permissions-table";
import { Pagination } from "@/application/components/ui/pagination";
import { usePermissionsPagination } from "../hooks/use-permissions-pagination";
import { RegisterPermissionButton } from "./register-permission-button";
import { RegisterPermissionForm } from "./register-permission-form";

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

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setLoading(false);
    setOpen(false);
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
      <PermissionsTable permissions={permissions} />
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
        value={{ name: "", description: "" }}
        onChange={() => {}}
        onBlur={() => {}}
      />
    </div>
  );
}
