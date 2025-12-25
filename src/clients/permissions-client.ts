import httpClient from "@/lib/http-client";

import type { Permission } from "@/types/identity/permission";
import type { Pagination } from "@/types/common/pagination";
import type { PermissionsFetchParameters } from "@/types/permissions/permissions-fetch-parameters";

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
}
