import type { JSX } from "react";

import { Navigate } from "react-router-dom";
import { useAuthorizationState } from "@/contexts/authorization-context";

type PermissionRouteProps = {
    children: JSX.Element;
    requiredPermission: string;
};

export const ProtectedRoute = ({ children, requiredPermission }: PermissionRouteProps) => {
    const { hasPermission } = useAuthorizationState();

    if (!hasPermission(requiredPermission)) {
        return <Navigate to="/" replace />;
    }

    return children;
};
