import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange?: (page: number) => void;
}

export function Pagination({ page, pageSize, total, totalPages, hasPreviousPage, hasNextPage, onPageChange }: Readonly<PaginationProps>) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="text-xs text-muted-foreground">
        Showing {Math.min((page - 1) * pageSize + 1, total)} - {Math.min(page * pageSize, total)} of {total} results
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="p-1 rounded border border-zinc-200 bg-transparent hover:bg-zinc-100 disabled:opacity-50"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange?.(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-500" strokeWidth={2} />
        </button>
        <span className="text-xs px-2">Page {page} of {totalPages}</span>
        <button
          className="p-1 rounded border border-zinc-200 bg-transparent hover:bg-zinc-100 disabled:opacity-50"
          disabled={!hasNextPage}
          onClick={() => onPageChange?.(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 text-zinc-500" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
