import { Result } from "@/types/common/result";
import { Storage } from "@/utils/storage";
import { StorageKeys } from "@/constants/storage-keys";
import { QueryParametersParser } from "@/utils/query-parameters-parser";

import type { GroupBasicDetails } from "@/types/group/group-basic-details";
import type { UsersFetchParameters } from "@/types/user/users-fetch-parameters";
import type { Pagination } from "@/types/common/pagination";
import type { UserDetails } from "@/types/identity/user-details";

export class UsersClient {
    public static async getUsers(tenant: string = "master", parameters?: UsersFetchParameters): Promise<Result<Pagination<UserDetails>>> {
        const filters: UsersFetchParameters = { pageNumber: 1, pageSize: 20, ...parameters };
        const token = Storage.getItem(StorageKeys.AccessToken);

        const queryString = QueryParametersParser.toQueryString(filters);
        const url = `http://vinder-io-identity-provider.somee.com/api/v1/users?${queryString}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-Tenant": tenant,
            },
        });

        const content = await response.json();
        if (!response.ok) {
            return Result.failure<Pagination<UserDetails>>(content);
        }

        return Result.success<Pagination<UserDetails>>(content);
    }

    public static async getUserGroups(id: string): Promise<Result<GroupBasicDetails>> {
        const token = Storage.getItem(StorageKeys.AccessToken);
        const httpMessage = {
            method: "GET",
            url: `http://vinder-io-identity-provider.somee.com/api/v1/users/${id}/groups`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-Tenant": "master",
            }
        };

        const response = await fetch(httpMessage.url, {
            method: httpMessage.method,
            headers: httpMessage.headers,
        });

        const content = await response.json();
        if (!response.ok) {
            return Result.failure<GroupBasicDetails>(content);
        }

        return Result.success<GroupBasicDetails>(content)
    }
}