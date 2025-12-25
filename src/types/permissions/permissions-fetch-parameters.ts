import type { PaginationFilters } from "@/types/common/pagination-filters";
import type { SortFilters } from "@/types/common/sort-filters";

export type PermissionsFetchParameters = {
  id?: string;
  name?: string;
  isDeleted?: boolean;
  pagination?: PaginationFilters;
  sort?: SortFilters;
  createdAfter?: string;
  createdBefore?: string;
};
