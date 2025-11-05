import { UsersClient } from "@/clients/users-client";
import { CacheKeys } from "@/constants/cache-keys";
import { useQuery } from "@tanstack/react-query";

import type { Pagination } from "@/types/common/pagination";
import type { Result } from "@/types/common/result";
import type { UseQueryResult } from "@tanstack/react-query";

import type { UserDetailsScheme } from "@/types/user/user-details.scheme";
import type { UsersFetchParameters } from "@/types/user/users-fetch-parameters.scheme";
import type { GroupBasicDetails } from "@/types/group/group-basic-details";

export class UsersHook {
    public static useUsers(parameters: UsersFetchParameters) :
        UseQueryResult<Result<Pagination<UserDetailsScheme>>>
    {
        return useQuery({
            queryKey: [CacheKeys.Users, parameters],
            queryFn: async (): Promise<Result<Pagination<UserDetailsScheme>>> => {
                return await UsersClient.getUsersAsync(parameters);
            },
        });
    }

    public static useUserGroups(userId: string) :
        UseQueryResult<Result<GroupBasicDetails>>
    {
        return useQuery({
            queryKey: [CacheKeys.UserGroups, userId],
            queryFn: async (): Promise<Result<GroupBasicDetails>> => {
                return await UsersClient.getUserGroupsAsync(userId);
            }
        })
    }
}