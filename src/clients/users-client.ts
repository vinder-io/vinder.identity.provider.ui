import { Result } from "@/types/common/result";
import httpClient from "@/lib/http-client";

import type { GroupBasicDetails } from "@/types/group/group-basic-details";

export class UsersClient {
    public static async getUserGroups(id: string): Promise<Result<GroupBasicDetails>> {
        try {
            const response = await httpClient.get<GroupBasicDetails>(`/users/${id}/groups`);
            return Result.success<GroupBasicDetails>(response.data);
        }
        catch (error: any) {
            return Result.failure<GroupBasicDetails>(error.response.data);
        }
    }
}
