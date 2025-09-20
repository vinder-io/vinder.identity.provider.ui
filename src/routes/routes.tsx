import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "@/application/components/protected-route"

import LoginPage from "@/application/pages/identity/page"
import DashboardPage from "@/application/pages/dashboard/page"
import UsersDashboardPage from "@/application/pages/dashboard/users/page"

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
                <Route path="/dashboard/users" element={
                    <ProtectedRoute requiredPermission="vinder.defaults.permissions.permissions.edit">
                        <UsersDashboardPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}
