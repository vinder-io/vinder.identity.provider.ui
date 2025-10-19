import httpClient from "@/lib/http-client";
import { Result } from "@/types/common/result";

import type { Pagination } from "@/types/common/pagination";
import type { TenantDetails } from "@/types/tenant/tenant-details";

export class TenantsClient {
    public static async getTenants(): Promise<Result<Pagination<TenantDetails>>> {
        try {
            const response = await httpClient.get<Pagination<TenantDetails>>("/tenants");
            return Result.success<Pagination<TenantDetails>>(response.data);
        }
        catch (error: any) {
            return Result.failure<Pagination<TenantDetails>>(error.response.data);
        }
    }
}
