"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import RowActions from "./row-actions"

export type Student = {
  id: string
  name: string
  course: string
  fees: number
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "fees",
    header: "Fees",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <RowActions student={row.original} />
    },
  },
]