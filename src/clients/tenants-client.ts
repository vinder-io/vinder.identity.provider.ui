import { StorageKeys } from "@/constants/storage-keys";
import { Storage } from "@/utils/storage";
import { Result } from "@/types/common/result";

import type { Pagination } from "@/types/common/pagination";
import type { TenantDetails } from "@/types/tenant/tenant-details";

export class TenantsClient {
    public static async getTenants(): Promise<Result<Pagination<TenantDetails>>> {
        const token = Storage.getItem(StorageKeys.AccessToken);
        const httpMessage = {
            method: "GET",
            url: "http://vinder-io-identity-provider.somee.com/api/v1/tenants",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-Tenant": "master"
            },
        };

        const response = await fetch(httpMessage.url, {
            method: httpMessage.method,
            headers: httpMessage.headers
        });

        const content = await response.json();
        if (!response.ok) {
            return Result.failure<Pagination<TenantDetails>>(content);
        }

        return Result.success<Pagination<TenantDetails>>(content);
    }
}