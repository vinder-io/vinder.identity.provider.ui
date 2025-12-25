import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "@/application/components/protected-route"

import LoginPage from "@/application/pages/identity/page"
import DashboardPage from "@/application/pages/dashboard/page"
import PermissionsPage from "@/application/pages/permissions/page"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute requiredPermission="vinder.defaults.permissions.permissions.edit">
                        <DashboardPage />
                    </ProtectedRoute>
                } />
                <Route path="/permissions" element={
                    <ProtectedRoute requiredPermission="vinder.defaults.permissions.permissions.edit">
                        <PermissionsPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}
