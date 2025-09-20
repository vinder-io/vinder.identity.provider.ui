export type Pagination<TItem> = {
    items: TItem[];
    total: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
};
