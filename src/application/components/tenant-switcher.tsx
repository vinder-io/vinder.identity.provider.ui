import { DropdownMenu, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { TenantsClient } from "@/clients/tenants-client";

import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";

import { useEffect, useState } from "react";

import type { TenantDetails } from "@/types/tenant/tenant-details";
import { tenantStore } from "@/stores/tenant/tenant-store";


const styles = {
    button: "flex items-center space-x-2",
    content: "w-56 bg-background rounded-md shadow-lg p-1 border",
    item: "p-2 cursor-pointer rounded-sm hover:bg-muted"
}

export function TenantSwitcher() {
    const setTenant = tenantStore((state) => state.setTenant);

    const [tenants, setTenants] = useState<TenantDetails[]>([]);
    const [selectedTenant, setSelectedTenant] = useState<TenantDetails | null>(null);

    useEffect(() => {
        const loadTenants = async () => {
            const result = await TenantsClient.getTenants();

            if (result.isSuccess && result.data?.items) {
                setTenants(result.data.items);

                const masterTenant = result.data.items.find(
                    where => where.name.toLowerCase() === "master"
                );

                setSelectedTenant(masterTenant ?? result.data.items[0]);
                setTenant((masterTenant ?? result.data.items[0]).name);
            }
        };

        loadTenants();
    }, []);

    const handleSelect = (tenantId: string) => {
        const tenant = tenants.find(where => where.id === tenantId);
        if (tenant) {
            setSelectedTenant(tenant);
            setTenant(tenant.name);
        }
    };

    if (!selectedTenant)
        return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className={styles.button}>
                    <Layers className="w-4 h-4" />
                    <span>{selectedTenant!.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={styles.content}>
                {tenants.map((tenant) => (
                    <DropdownMenuItem key={tenant.id} onClick={() => handleSelect(tenant.id)} className={styles.item}>
                        {tenant.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}