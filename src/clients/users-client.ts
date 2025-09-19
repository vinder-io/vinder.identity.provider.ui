import type { GroupBasicDetails } from "@/types/group/group-basic-details";

import { Result } from "@/types/common/result";
import { Storage } from "@/utils/storage";
import { StorageKeys } from "@/constants/storage-keys";

export class UsersClient {
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