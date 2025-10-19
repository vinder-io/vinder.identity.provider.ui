import { create } from "zustand"
import type { TenantState } from "./tenant-state"

export const tenantStore = create<TenantState>((set) => ({
    tenant: "master",
    setTenant: (tenant: string) => set({ tenant: tenant }),
    clearTenant: () => set({ tenant: "master" }),
}));