import { PermissionsClient } from "@/clients/permissions-client";
import { useQuery } from "@tanstack/react-query";

import type { PermissionsFetchParameters } from "@/types/permissions/permissions-fetch-parameters";
import type { Result } from "@/types/common/result";
import type { Pagination } from "@/types/common/pagination";
import type { Permission } from "@/types/identity/permission";

export function usePermissions(parameters: PermissionsFetchParameters = {}) {
    return useQuery<Result<Pagination<Permission>>>({
        queryKey: ["permissions", parameters],
        queryFn: async () => PermissionsClient.getPermissionsAsync(parameters),
    });
}
