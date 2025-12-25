import { PermissionsTable } from "./permissions-table";
import type { Permission } from "@/types/identity/permission";

const styles = {
  container: "max-w-4xl mx-auto py-10",
  heading: "text-2xl font-semibold text-foreground mb-2",
  subheading: "text-base text-muted-foreground mb-8",
};

interface PermissionsContentProps {
  permissions: Permission[];
}

export function PermissionsContent({ permissions }: Readonly<PermissionsContentProps>) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Manage your permissions</h1>
      <p className={styles.subheading}>
        Here you can view, create, and manage all the permissions available in your system. Use the table below to explore existing permissions or add new ones as needed.
      </p>
      {/* Aqui pode entrar um botão de criar permissões futuramente */}
      <PermissionsTable permissions={permissions} />
    </div>
  );
}
