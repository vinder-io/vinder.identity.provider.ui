export class QueryParametersParser {
    private constructor() { }

    public static toQueryString<TParameters extends Record<string, any>>(instance?: TParameters): string {
        if (!instance) return '';

        const entries = Object.entries(instance);

        let first = true;
        let queryString = '';

        for (const [key, value] of entries) {
            if (value === null || value === undefined) continue;

            if (key === 'pagination' && typeof value === 'object') {
                if (value.pageNumber !== undefined) {
                    queryString += (first ? '' : '&') + `pagination.pageNumber=${encodeURIComponent(value.pageNumber)}`;
                    first = false;
                }

                if (value.pageSize !== undefined) {
                    queryString += (first ? '' : '&') + `pagination.pageSize=${encodeURIComponent(value.pageSize)}`;
                    first = false;
                }

                continue;
            }

            if (key === 'sort' && typeof value === 'object') {
                if (value.field !== undefined) {
                    queryString += (first ? '' : '&') + `sort.field=${encodeURIComponent(value.field)}`;
                    first = false;
                }

                if (value.direction !== undefined) {
                    queryString += (first ? '' : '&') + `sort.direction=${encodeURIComponent(value.direction)}`;
                    first = false;
                }

                continue;
            }

            const name = this.toCamelCase(key);
            let stringValue: string;

            if (typeof value === 'boolean') {
                stringValue = value.toString().toLowerCase();
            }
            else {
                stringValue = String(value);
            }

            stringValue = encodeURIComponent(stringValue);

            if (first) {
                first = false;
            }
            else {
                queryString += '&';
            }

            queryString += `${name}=${stringValue}`;
        }

        return queryString;
    }

    private static toCamelCase(value: string): string {
        if (!value || value.length === 0 || value.startsWith(value[0].toLowerCase())) {
            return value;
        }
        return value[0].toLowerCase() + value.slice(1);
    }
}
