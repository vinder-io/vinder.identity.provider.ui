export class QueryParametersParser {
    private constructor() { }

    public static toQueryString<TParameters extends Record<string, any>>(instance?: TParameters): string {
        if (!instance) return '';

        const entries = Object.entries(instance);
        let queryParts: string[] = [];

        for (const [key, value] of entries) {
            if (value === null || value === undefined) continue;

            if (key === 'pagination' && typeof value === 'object') {
                queryParts.push(...this.handlePagination(value));
                continue;
            }

            if (key === 'sort' && typeof value === 'object') {
                queryParts.push(...this.handleSort(value));
                continue;
            }

            const part = this.handleGenericKeyValue(key, value);
            if (part) queryParts.push(part);
        }

        return queryParts.join('&');
    }

    private static handlePagination(pagination: any): string[] {
        const parts: string[] = [];

        if (pagination.pageNumber !== undefined) {

            parts.push(`pagination.pageNumber=${encodeURIComponent(pagination.pageNumber)}`);
        }

        if (pagination.pageSize !== undefined) {
            parts.push(`pagination.pageSize=${encodeURIComponent(pagination.pageSize)}`);
        }
        return parts;
    }

    private static handleSort(sort: any): string[] {
        const parts: string[] = [];

        if (sort.field !== undefined) {
            parts.push(`sort.field=${encodeURIComponent(sort.field)}`);
        }

        if (sort.direction !== undefined) {
            parts.push(`sort.direction=${encodeURIComponent(sort.direction)}`);
        }

        return parts;
    }

    private static handleGenericKeyValue(key: string, value: any): string | null {
        const name = this.toCamelCase(key);

        let stringValue: string;

        if (typeof value === 'boolean') {
            stringValue = value.toString().toLowerCase();
        }
        else {
            stringValue = String(value);
        }

        stringValue = encodeURIComponent(stringValue);

        return `${name}=${stringValue}`;
    }

    private static toCamelCase(value: string): string {
        if (!value || value.length === 0 || value.startsWith(value[0].toLowerCase())) {
            return value;
        }

        return value[0].toLowerCase() + value.slice(1);
    }
}
