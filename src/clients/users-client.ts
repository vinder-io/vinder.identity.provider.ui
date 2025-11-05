import httpClient from "@/lib/http-client";

import { Result } from "@/types/common/result";
import { QueryParametersParser } from "@/utils/query-parameters-parser";

import type { GroupBasicDetails } from "@/types/group/group-basic-details";
import type { UserDetailsScheme } from "@/types/user/user-details.scheme";
import type { UsersFetchParameters } from "@/types/user/users-fetch-parameters.scheme";
import type { Pagination } from "@/types/common/pagination";

export class UsersClient {
    public static async getUserGroupsAsync(id: string): Promise<Result<GroupBasicDetails>> {
        try {
            const response = await httpClient.get<GroupBasicDetails>(`/users/${id}/groups`);
            return Result.success<GroupBasicDetails>(response.data);
        }
        catch (error: any) {
            return Result.failure<GroupBasicDetails>(error.response.data);
        }
    }

    public static async getUsersAsync(parameters: UsersFetchParameters): Promise<Result<Pagination<UserDetailsScheme>>> {
        try {
            const queryString = QueryParametersParser.toQueryString(parameters);
            const response = await httpClient.get<Pagination<UserDetailsScheme>>(`/users?${queryString}`);

            return Result.success<Pagination<UserDetailsScheme>>(response.data);
        }
        catch (error: any) {
            return Result.failure<Pagination<UserDetailsScheme>>(error.response.data);
        }
    }
}
