/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Icons } from "../ui/icons";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSizeOptions?: number[];
  pageCount?: number;
  className?: string;
  pageChange?: (value: number) => void;
  sizeChange?: (value: number) => void;
  isPagination?: boolean;
  classNameTable?: string;
  initialPage?: number;
  initialSize?: number;
  isLoading?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pageSizeOptions = [2, 10, 20, 30, 40, 50],
  className,
  pageChange,
  sizeChange,
  isPagination = true,
  classNameTable,
  initialPage = 1,
  initialSize = 10,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const useURLParams = !pageChange || !sizeChange;

  const page = useURLParams
    ? searchParams?.get("page") ?? `${initialPage}`
    : `${initialPage}`;
  const perPage = useURLParams
    ? searchParams?.get("limit") ?? `${initialSize}`
    : `${initialSize}`;

  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;

  const perPageAsNumber = Number(perPage);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: fallbackPage - 1,
    pageSize: fallbackPerPage,
  });

  React.useEffect(() => {
    if (pageChange && sizeChange) {
      pageChange?.(pageIndex + 1);
      sizeChange?.(pageSize);
    } else {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("page", (pageIndex + 1).toString());
      params.set("limit", pageSize.toString());
      router.replace(`?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    manualPagination: true,
    manualFiltering: true,
  });

  const totalPageCount = table.getPageCount();
  const visiblePages: Array<number | "ellipsis"> = [];

  if (totalPageCount <= 5) {
    for (let i = 0; i < totalPageCount; i++) visiblePages.push(i);
  } else {
    visiblePages.push(0);
    if (pageIndex > 2) visiblePages.push("ellipsis");
    for (
      let i = Math.max(1, pageIndex - 1);
      i <= Math.min(totalPageCount - 2, pageIndex + 1);
      i++
    ) {
      visiblePages.push(i);
    }
    if (pageIndex < totalPageCount - 3) visiblePages.push("ellipsis");
    visiblePages.push(totalPageCount - 1);
  }

  return (
    <>
      <ScrollArea
        className={cn(
          "overflow-auto rounded-[20px] border border-accent-foreground px-4",
          className
        )}
      >
        <Table className={cn("relative min-w-max", classNameTable)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "whitespace-nowrap",
                      (header.column.columnDef.meta as any)?.className
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center w-full"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <Icons.spinner className="size-8 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={(cell.column.columnDef.meta as any)?.className}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Result
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {isPagination && (
        <div className="flex flex-col items-center justify-between gap-2 space-x-2 py-4 sm:flex-row">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
              <div className="flex items-center space-x-2">
                <p className="whitespace-nowrap text-sm font-medium">Size:</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={`${table.getState().pagination.pageSize}`}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {pageSizeOptions.map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {totalPageCount > 0 && (
            <div className="flex w-full items-center justify-end gap-2 sm:justify-end">
              <Pagination className="justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => table.previousPage()}
                      isActive={!table.getCanPreviousPage()}
                    />
                  </PaginationItem>
                  {visiblePages.map((page, index) => (
                    <PaginationItem key={index}>
                      {page === "ellipsis" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          isActive={
                            table.getState().pagination.pageIndex === page
                          }
                          onClick={() => table.setPageIndex(page)}
                        >
                          {page + 1}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => table.nextPage()}
                      isActive={!table.getCanNextPage()}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </>
  );
}
