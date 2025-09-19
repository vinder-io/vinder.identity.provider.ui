export class Error {
    public code: string;
    public description: string;

    public constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }

    public static readonly None = new Error("", "");
    public static readonly Unknown = new Error("Unknown", "An unknown error has occurred.");

    public static from(code: string, description: string): Error {
        return new Error(code, description);
    }

    public equals(other: Error): boolean {
        return this.code === other.code && this.description === other.description;
    }
}
