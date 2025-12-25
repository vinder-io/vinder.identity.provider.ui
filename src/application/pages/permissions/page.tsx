import { MainLayout } from "@/application/components/shared/main-layout";
import { PermissionsContent } from "./components/permissions-content";
import { usePermissions } from "./hooks/use-permissions";

export default function PermissionsPage() {
  const { data, isLoading } = usePermissions();

  if (isLoading) {
    return <div className="text-center py-10 text-muted-foreground">Carregando permissões...</div>;
  }

  const permissions = data?.data?.items ?? [];

  return (
    <MainLayout>
      <PermissionsContent permissions={permissions} />
    </MainLayout>
  );
}
