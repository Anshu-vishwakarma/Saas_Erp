import { Bell } from "lucide-react"

export default function Header(){

 return(

  <header className="bg-white border-b px-6 py-3 flex items-center justify-between">

   <h1 className="text-lg font-semibold">
    Dashboard
   </h1>

   <div className="flex items-center gap-4">

    <Bell size={20}/>

    <div className="w-8 h-8 rounded-full bg-gray-300"/>

   </div>

  </header>

 )

}