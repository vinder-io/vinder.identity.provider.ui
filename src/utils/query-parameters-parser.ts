export class QueryParametersParser {
    public static toQueryString<TParameters extends Record<string, any>>(instance?: TParameters): string {
        if (!instance) return "";

        const parts: string[] = [];

        for (const key in instance) {
            if (!Object.prototype.hasOwnProperty.call(instance, key))
                continue;

            const value = instance[key];
            if (value === null || value === undefined)
                continue;

            const name = QueryParametersParser.toCamelCase(key);
            const stringValue = encodeURIComponent(String(value));

            parts.push(`${name}=${stringValue}`);
        }

        return parts.join("&");
    }

    private static toCamelCase(value: string): string {
        if (!value || value[0] === value[0].toLowerCase())
            return value;

        return value[0].toLowerCase() + value.slice(1);
    }
}
