import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { Toaster } from "react-hot-toast"

import "./index.css"
import AppRoutes from "./routes/routes.tsx"

import { AuthenticationStateProvider } from "./contexts/authentication-context.tsx"
import { AuthorizationStateProvider } from "./contexts/authorization-context.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthenticationStateProvider>
            <AuthorizationStateProvider>
                <Toaster position="bottom-right" />
                <AppRoutes />
            </AuthorizationStateProvider>
        </AuthenticationStateProvider>
    </StrictMode>
)
