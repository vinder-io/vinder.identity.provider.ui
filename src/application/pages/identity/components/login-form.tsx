import type React from "react"
import { useState } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { User, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IdentityClient } from "@/clients/identity-client"

import logo from "@/assets/logo.svg"
import toast from "react-hot-toast"

import { useAuthenticationState } from "@/contexts/authentication-context"
import { useNavigate } from "react-router-dom"

const styles = {
    card: "border-0 shadow-none",
    cardHeader: "text-center pb-8",
    cardTitle: "text-2xl font-normal text-foreground",
    cardContent: "space-y-6",
    form: "space-y-4",
    fieldWrapper: "space-y-2",
    label: "text-sm text-muted-foreground",
    userIcon: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
    inputUsername: "h-11 pl-10",
    inputPassword: "h-11 pr-10",
    passwordToggle: "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
    button: "w-full h-11 mt-6 select-none"
};

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { setAuthenticationState } = useAuthenticationState();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const credentials = { username, password };
        const result = await IdentityClient.authenticate(credentials);

        if (!result.isSuccess) {
            toast.error("Oops! We couldn't sign you in. Double-check your credentials and try again.");
            return;
        }

        toast.success("Your identification was successful!");

        setAuthenticationState(result.data!);
        navigate("/dashboard");
    };

    return (
        <Card className={styles.card}>
            <CardHeader className={styles.cardHeader}>
                <img src={logo} alt="Logo" className="mx-auto pointer-events-none select-none" />
            </CardHeader>
            <CardContent className={styles.cardContent}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.fieldWrapper}>
                        <Label htmlFor="username" className={styles.label}>Username</Label>
                        <div className="relative">
                            <User className={styles.userIcon} />
                            <Input id="username" type="text" value={username}
                                onChange={(event: { target: { value: React.SetStateAction<string> } }) => setUsername(event.target.value)}
                                className={styles.inputUsername}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.fieldWrapper}>
                        <Label htmlFor="password" className={styles.label}>Password</Label>
                        <div className="relative">
                            <Input id="password" type={showPassword ? "text" : "password"} value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputPassword}
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
                                {showPassword ? (<EyeOff className="h-4 w-4" />) : (<Eye className="h-4 w-4" />)}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className={styles.button}>Sign In</Button>
                </form>
            </CardContent>
        </Card>
    )
}
