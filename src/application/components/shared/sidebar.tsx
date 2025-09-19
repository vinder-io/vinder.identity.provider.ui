import { Settings, User, Key, Users, Layers, } from "lucide-react"
import { Button } from "@/components/ui/button"

const bottomItems = [{ id: 'settings', label: 'Settings', icon: Settings }];
const navigationItems = [
    { id: 'users', label: 'Users', icon: User, active: true },
    { id: 'permissions', label: 'Permissions', icon: Key, active: false },
    { id: 'groups', label: 'Groups', icon: Users, active: false },
    { id: "tenants", label: "Tenants", icon: Layers, active: false }
];

// define sidebar styles here to keep jsx cleaner
// without cluttering the component with tailwind classes

const styles = {
    container: "w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full",
    buttonBase: "w-full justify-start space-x-3 px-3 py-2 h-10 text-sm font-medium transition-smooth rounded-lg",
    active: "bg-zinc-200 text-primary border-r-2 border-primary hover:bg-zinc-300",
    inactive: "text-muted-foreground hover:text-foreground hover:bg-gray-100",
    bottomContainer: "border-t border-sidebar-border p-4 space-y-1",
    bottomButton: `
        w-full justify-start space-x-3 px-3 py-2 h-10 text-sm font-medium
        text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-smooth rounded-lg
    `
};

export function Sidebar() {
    return (
        <div className={styles.container}>
            <div className="flex-1 p-4 space-y-1">
                {navigationItems.map((item) => (
                    <Button key={item.id} variant="ghost"
                        className={`${styles.buttonBase} ${item.active ? styles.active : styles.inactive}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                    </Button>
                ))}
            </div>

            <div className={styles.bottomContainer}>
                {bottomItems.map((item) => (
                    <Button key={item.id} variant="ghost" className={styles.bottomButton}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}