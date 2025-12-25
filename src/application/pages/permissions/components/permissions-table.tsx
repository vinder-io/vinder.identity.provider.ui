import type { Permission } from "@/types/identity/permission";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const styles = {
  card: "border-0 shadow-none",
  cardHeader: "pb-4 border-b",
  cardTitle: "text-xl font-semibold text-foreground",
  cardContent: "p-0",
  table: "min-w-full divide-y divide-muted",
  th: "px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
  td: "px-6 py-4 whitespace-nowrap text-sm text-foreground",
  badge: "bg-muted text-xs font-medium px-2 py-1 rounded"
};

interface PermissionsTableProperties {
  permissions: Permission[];
}

export function PermissionsTable({ permissions }: Readonly<PermissionsTableProperties>) {
  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <span className={styles.cardTitle}>Permissions</span>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <Table className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableHead className={styles.th}>Identifier</TableHead>
              <TableHead className={styles.th}>Name</TableHead>
              <TableHead className={styles.th}>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className={styles.td}>
                  <Badge className={styles.badge}>{permission.id}</Badge>
                </TableCell>
                <TableCell className={styles.td}>{permission.name}</TableCell>
                <TableCell className={styles.td}>{permission.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
