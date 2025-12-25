import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { Toaster } from "react-hot-toast"
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

import "./index.css"
import AppRoutes from "./routes/routes.tsx"

import { AuthenticationStateProvider } from "./contexts/authentication-context.tsx"
import { AuthorizationStateProvider } from "./contexts/authorization-context.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthenticationStateProvider>
                <AuthorizationStateProvider>
                    <Toaster position="bottom-right" />
                    <AppRoutes />
                </AuthorizationStateProvider>
            </AuthenticationStateProvider>
        </QueryClientProvider>
    </StrictMode>
)
