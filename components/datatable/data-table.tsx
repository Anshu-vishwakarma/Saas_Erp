"use client"

import * as React from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

export function DataTable<TData>({
  columns,
  data,
}: Props<TData>) {

  const [sorting, setSorting] = React.useState<import("@tanstack/react-table").SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  return (
    <div className="space-y-4">

      <Input placeholder="Search students..." />

      <div className="border rounded-md">

        <Table>

          <TableHeader>

            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>

                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>

                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                  </TableHead>
                ))}

              </TableRow>
            ))}

          </TableHeader>

          <TableBody>

            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>

                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>

                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}

                  </TableCell>
                ))}

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </div>

      {/* Pagination */}

      <div className="flex justify-end gap-2">

        <Button
          variant="outline"
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={() => table.nextPage()}
        >
          Next
        </Button>

      </div>

    </div>
  )
}