import httpClient from "@/lib/http-client";
import { Result } from "@/types/common/result";

import type { AuthenticationCredentials } from "@/types/identity/authentication-credentials";
import type { AuthenticationResponse } from "@/types/identity/authentication-response";

export class IdentityClient {
    public static async authenticate(credentials: AuthenticationCredentials): Promise<Result<AuthenticationResponse>> {
        try {
            const response = await httpClient.post<AuthenticationResponse>("/identity/authenticate", credentials);
            return Result.success<AuthenticationResponse>(response.data);
        }
        catch (error: any) {
            return Result.failure<AuthenticationResponse>(error.response.data);
        }
    }
}
