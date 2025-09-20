import logo from "@/assets/logo.svg";

import { useEffect, useState } from "react";
import { User, Key, Users, Layers, Settings, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "../user-avatar";
import { TenantSwitcher } from "../tenant-switcher";
import { useAuthenticationState } from "@/contexts/authentication-context";

import { JwtParser } from "@/utils/jwt-parser";
import type { UserDetails } from "@/types/identity/user-details";

const navigationItems = [
    { id: "users", label: "Users", icon: User, active: true },
    { id: "permissions", label: "Permissions", icon: Key, active: false },
    { id: "groups", label: "Groups", icon: Users, active: false },
    { id: "tenants", label: "Tenants", icon: Layers, active: false },
];

const utilityItems = [
    { id: "docs", label: "Documentation", icon: BookOpen, href: "https://github.com/vinder-io/vinder.identity.provider", external: true },
    { id: "settings", label: "Configurations", icon: Settings, href: "/settings", external: false },
];

// define header styles here to keep jsx cleaner
const styles = {
    header: "h-16 bg-surface border-b border-sidebar-border flex items-center justify-between px-6 relative z-50",
    logoContainer: "flex items-center space-x-2",
    nav: "flex items-center space-x-1",
    navButton: `
        flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
        transition-colors duration-200 ease-in-out
    `,
    navButtonActive: "bg-brand-primary text-foreground hover:text-foreground hover:bg-secondary",
    navButtonInactive: "text-muted-foreground hover:text-foreground hover:bg-secondary",
    icon: "w-4 h-4",
    rightSection: "flex items-center space-x-4",
    link: "text-sm text-muted-foreground hover:text-foreground transition-colors",
};

export function Header() {
    const { accessToken } = useAuthenticationState();
    const [user, setUser] = useState<UserDetails | null>(null);

    useEffect(() => {
        setUser(JwtParser.getUserDetails(accessToken));
    }, [accessToken]);

    return (
        <header className={styles.header}>
            <div className="flex items-center space-x-8">
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Vinder Logo" className="h-10 w-auto pointer-events-none select-none" />
                </div>
                <nav className={styles.nav}>
                    {navigationItems.map((item) => (
                        <Button key={item.id} variant="ghost" size="sm"
                            className={`${styles.navButton} ${item.active ? styles.navButtonActive : styles.navButtonInactive}`}>
                            <item.icon className={styles.icon} />
                            <span>{item.label}</span>
                        </Button>
                    ))}
                </nav>
            </div>

            <div className={styles.rightSection}>
                {utilityItems.map((item) => (
                    <a key={item.id} href={item.href} target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}>
                        <Button variant="ghost" size="sm" className={`${styles.navButton} ${styles.navButtonInactive}`}>
                            <item.icon className={styles.icon} />
                            <span>{item.label}</span>
                        </Button>
                    </a>
                ))}

                <TenantSwitcher />
                <UserAvatar userName={user?.username!} />
            </div>
        </header>
    );
}