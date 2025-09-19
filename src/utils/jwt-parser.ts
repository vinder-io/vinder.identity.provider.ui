import type { UserDetails } from "@/types/identity/user-details";

export class JwtParser {
    public static decode(token: string): any {
        if (!token) {
            return null;
        }

        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    }

    public static getPermissions(token: string): string[] {
        const decoded = this.decode(token);
        return decoded?.role || [];
    }

    public static getUserDetails(token: string): UserDetails | null {
        const decoded = this.decode(token);
        if (!decoded) return null;

        return {
            id: decoded.sub,
            username: decoded.preferred_username
        };
    }
}
