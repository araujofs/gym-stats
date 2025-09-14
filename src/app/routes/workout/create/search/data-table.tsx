import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type RowSelectionState,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useRef, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setSelected: (selected: TData[]) => void
}

export default function DataTable<TData extends { id: number }, TValue>({
  columns,
  data,
  setSelected
}: DataTableProps<TData, TValue>) {
  const selected = useRef<{[key: string]: TData}>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5
  })
  const table = useReactTable({
    data,
    columns,
    getRowId: row => String(row.id),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination
    }
  })

  table.getSelectedRowModel().rows.map(row => {
    selected.current[row.id] = row.original
  })

  Object.keys(selected.current).map(key => {
    if (!rowSelection[key]) {
      delete selected.current[key]
    }
  })
  
  setSelected(Object.values(selected.current))

  return (
    <div className="flex flex-col flex-1 gap-3">
      <div className="flex flex-1 overflow-hidden rounded-md border">
        <Table className="h-full">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-full">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-full">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No exercises.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="">
            <PaginationPrevious
              isActive={table.getCanPreviousPage()}
              onClick={() => {
                if (table.getCanPreviousPage()) {
                  table.previousPage()
                }
              }}
              className={`select-none cursor-pointer ${
                !table.getCanPreviousPage() &&
                'bg-inherit hover:bg-inherit! cursor-default'
              }`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              isActive={table.getCanNextPage()}
              onClick={() => {
                if (table.getCanNextPage()) {
                  table.nextPage()
                }
              }}
              className={`select-none cursor-pointer ${
                !table.getCanNextPage() &&
                'bg-inherit hover:bg-inherit! cursor-default'
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
