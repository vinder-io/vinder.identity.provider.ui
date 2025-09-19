import { LoginForm } from "./components/login-form"

const styles = {
    wrapper: "min-h-screen flex items-center justify-center bg-background",
    container: "w-full max-w-sm"
};

export default function LoginPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <LoginForm />
            </div>
        </div>
    )
}
