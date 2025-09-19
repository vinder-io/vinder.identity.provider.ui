import { Result } from "@/types/common/result";

import type { AuthenticationCredentials } from "@/types/identity/authentication-credentials";
import type { AuthenticationResponse } from "@/types/identity/authentication-response";

export class IdentityClient {
    public static async authenticate(credentials: AuthenticationCredentials): Promise<Result<AuthenticationResponse>> {
        const httpMessage = {
            method: "POST",
            url: "http://vinder-io-identity-provider.somee.com/api/v1/identity/authenticate",
            headers: { "Content-Type": "application/json", "X-Tenant": "master" },
            body: JSON.stringify(credentials)
        };

        const response = await fetch(httpMessage.url, {
            method: httpMessage.method,
            headers: httpMessage.headers,
            body: httpMessage.body
        });

        const content = await response.json();
        if (!response.ok) {
            return Result.failure<AuthenticationResponse>(content);
        }

        return Result.success<AuthenticationResponse>(content)
    }
}