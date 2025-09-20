import type { ReactNode } from "react";
import type { TenantDetails } from "@/types/tenant/tenant-details";

import { createContext, useState, useContext } from "react";
import { String } from "@/constants/string";

type TenantContext = {
    tenant: TenantDetails | null;
    setTenant: (tenant: TenantDetails) => void;
};

const TenantContext = createContext<TenantContext | undefined>(undefined);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
    const [tenant, setTenant] = useState<TenantDetails | null>(null);

    return (
        <TenantContext.Provider value={{ tenant, setTenant }}>
            {children}
        </TenantContext.Provider>
    );
};

export const useTenant = () => {
    const context = useContext(TenantContext);

    if (!context)
        throw new Error(String.Empty);

    return context;
};
