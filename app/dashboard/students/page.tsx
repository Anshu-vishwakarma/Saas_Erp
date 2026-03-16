import { DataTable } from "@/components/datatable/data-table"
import { columns } from "@/components/datatable/columns"

async function getStudents() {

  return [
    {
      id: "1",
      name: "Rahul",
      course: "MERN",
      fees: 30000,
    },
    {
      id: "2",
      name: "Priya",
      course: "React",
      fees: 25000,
    },
  ]
}

export default async function StudentsPage() {

  const data = await getStudents()

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">
        Students
      </h1>

      <DataTable
        columns={columns}
        data={data}
      />

    </div>
  )
}