import { Result } from "@/types/common/result";

import type { AuthenticationCredentials } from "@/types/identity/authentication-credentials";
import type { AuthenticationResponse } from "@/types/identity/authentication-response";

export class IdentityClient {
    public static async authenticate(credentials: AuthenticationCredentials): Promise<Result<AuthenticationResponse>> {
        const httpMessage = {
            method: "POST",
            url: `${import.meta.env.VITE_IDENTITY_PROVIDER_URI}/identity/authenticate`,
            headers: { "Content-Type": "application/json", "X-Tenant": `${import.meta.env.VITE_DEFAULT_TENANT}` },
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