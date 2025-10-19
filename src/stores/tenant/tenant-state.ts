export type TenantState = {
    tenant: string
    setTenant: (tenant: string) => void
    clearTenant: () => void
}
