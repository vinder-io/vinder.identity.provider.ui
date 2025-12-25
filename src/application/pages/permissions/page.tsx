import { PermissionsTable } from "./components/permissions-table";
import { usePermissions } from "./hooks/use-permissions";

export default function PermissionsPage() {
  const { data, isLoading } = usePermissions();

  if (isLoading) {
    return <div className="text-center py-10 text-muted-foreground">Carregando permissões...</div>;
  }

  const permissions = data?.data?.items ?? [];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <PermissionsTable permissions={permissions} />
    </div>
  );
}
