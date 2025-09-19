export class Storage {
    public static getItem(key: string, fallback: string = ""): string {
        const value = localStorage.getItem(key);
        return value ?? fallback;
    }

    public static setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public static removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public static clear(): void {
        localStorage.clear();
    }
}
