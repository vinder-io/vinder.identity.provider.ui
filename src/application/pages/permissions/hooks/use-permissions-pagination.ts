import { useState } from "react";
import { usePermissions } from "./use-permissions";
import type { PermissionsFetchParameters } from "@/types/permissions/permissions-fetch-parameters";

export function usePermissionsPagination(initialParams: PermissionsFetchParameters = {}) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading } = usePermissions({ ...initialParams, pagination: { pageNumber: page, pageSize } });

  const pagination = data?.data;

  return {
    permissions: pagination?.items ?? [],
    isLoading,
    page,
    pageSize,
    total: pagination?.total ?? 0,
    totalPages: pagination?.totalPages ?? 1,
    hasPreviousPage: pagination?.hasPreviousPage ?? false,
    hasNextPage: pagination?.hasNextPage ?? false,
    setPage,
  };
}
