"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

interface Student {
  // Define the properties of a student as needed, for example:
  id: string;
  name: string;
  // Add other properties as required
}

export default function RowActions({ student }: { student: Student }) {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>

        <DropdownMenuItem>
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem>
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  )
}