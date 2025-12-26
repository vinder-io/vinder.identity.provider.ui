import httpClient from "@/lib/http-client";

import type { Permission } from "@/types/identity/permission";
import type { Pagination } from "@/types/common/pagination";
import type { PermissionsFetchParameters } from "@/types/permissions/permissions-fetch-parameters";
import type { PermissionCreationScheme } from "@/types/permissions/permission-creation-scheme";

import { Result } from "@/types/common/result";
import { QueryParametersParser } from "@/utils/query-parameters-parser";

export class PermissionsClient {
    public static async getPermissionsAsync(parameters: PermissionsFetchParameters = {  }): Promise<Result<Pagination<Permission>>> {
        try {
            const queryString = QueryParametersParser.toQueryString(parameters);
            const response = await httpClient.get<Pagination<Permission>>(`/permissions?${queryString}`);

            return Result.success<Pagination<Permission>>(response.data);
        } catch (error: any) {
            return Result.failure<Pagination<Permission>>(error.response?.data);
        }
    }

    public static async createPermissionAsync(scheme: PermissionCreationScheme): Promise<Result<Permission>> {
        try {
            const response = await httpClient.post<Permission>("/permissions", scheme);
            return Result.success<Permission>(response.data);
        } catch (error: any) {
            return Result.failure<Permission>(error.response?.data);
        }
    }

    public static async updatePermissionAsync(id: string, permission: Permission): Promise<Result<Permission>> {
        try {
            const response = await httpClient.put<Permission>(`/permissions/${id}`, permission);
            return Result.success<Permission>(response.data);
        } catch (error: any) {
            return Result.failure<Permission>(error.response?.data);
        }
    }

    public static async deletePermissionAsync(id: string): Promise<Result<null>> {
        try {
            await httpClient.delete(`/permissions/${id}`);
            return Result.success<null>(null);
        } catch (error: any) {
            return Result.failure<null>(error.response?.data);
        }
    }
}
