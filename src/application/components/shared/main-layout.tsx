import type { ReactNode } from "react";
import { Header } from "./header"

interface MainLayoutProperties { children: ReactNode };

export function MainLayout({ children }: MainLayoutProperties) {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
};