import type { Dispatch, ReactNode, SetStateAction } from "react";

import { createContext, useState, useContext, useEffect } from "react";
import { useAuthenticationState } from "./authentication-context";
import { JwtParser } from "@/utils/jwt-parser";

import { String } from "@/constants/string";
import { UsersClient } from "@/clients/users-client";

type AuthorizationStateContextParameters = {
    permissions: string[];
    groups: string[];

    hasPermission: (permission: string) => boolean;
    hasGroup: (groupId: string) => boolean;
};

const AuthorizationContext = createContext<AuthorizationStateContextParameters | undefined>(undefined);

export const AuthorizationStateProvider = ({ children }: { children: ReactNode }) => {
    const { accessToken } = useAuthenticationState();

    const [permissions, setPermissions] = useState<string[]>([]);
    const [groups, setGroups] = useState<string[]>([]);

    useEffect(() => {
        // We call this "metadata" because it represents user-related authorization data,
        // such as permissions and groups, which are essentially metadata about the user's access rights.
        loadAuthorizationMetadata(accessToken, setPermissions, setGroups);
    }, [accessToken]);

    const hasPermission = (permission: string) => permissions.includes(permission);
    const hasGroup = (group: string) => groups.includes(group);

    return (
        <AuthorizationContext.Provider value={{ permissions, groups, hasPermission, hasGroup }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuthorizationState = () => {
    const context = useContext(AuthorizationContext);
    if (!context) throw new Error(String.Empty);
    return context;
};


async function loadAuthorizationMetadata(
    token: string | null,
    setPermissions: Dispatch<SetStateAction<string[]>>,
    setGroups: Dispatch<SetStateAction<string[]>>
) {
    if (!token) {
        setPermissions([]);
        setGroups([]);

        return;
    }

    setPermissions(JwtParser.getPermissions(token));

    const user = JwtParser.getUserDetails(token);

    if (!user)
        return;

    const result = await UsersClient.getUserGroups(user.id);

    if (result.isSuccess && result.data) {
        const groupNames = Array.isArray(result.data) ? result.data.map(group => group.name) : [result.data.name];
        setGroups(groupNames);
    }
}
