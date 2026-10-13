import { useCallback, useState } from 'react';
import type {
    ColumnFiltersState,
    PaginationState,
} from '@tanstack/react-table';
export function useTableState() {
    const [globalFilter, onGlobalFilterChange] = useState('');
    const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>(
        [],
    );
    const [pagination, onPaginationChange] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const ensurePageInRange = useCallback((pageCount: number) => {
        onPaginationChange((current) =>
            current.pageIndex >= Math.max(1, pageCount)
                ? { ...current, pageIndex: Math.max(0, pageCount - 1) }
                : current,
        );
    }, []);
    return {
        globalFilter,
        onGlobalFilterChange,
        columnFilters,
        onColumnFiltersChange,
        pagination,
        onPaginationChange,
        ensurePageInRange,
    };
}
