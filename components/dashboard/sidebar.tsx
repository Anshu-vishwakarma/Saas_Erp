"use client"

import SidebarItem from "./sidebar-item"

import {
 LayoutDashboard,
 Users,
 BookOpen,
 Layers,
 CreditCard,
 BarChart,
 Bot,
 Settings
} from "lucide-react"

export default function Sidebar(){

 return(

  <aside className="w-64 border-r bg-white h-screen flex flex-col">

   {/* Logo */}

   <div className="p-6 font-bold text-xl">
    AI ERP
   </div>

   {/* Navigation */}

   <nav className="flex flex-col gap-1 px-3">

    <SidebarItem
     icon={LayoutDashboard}
     label="Dashboard"
     href="/dashboard"
    />

    <SidebarItem
     icon={Users}
     label="Students"
     href="/dashboard/students"
    />

    <SidebarItem
     icon={BookOpen}
     label="Courses"
     href="/dashboard/courses"
    />

    <SidebarItem
     icon={Layers}
     label="Batches"
     href="/dashboard/batches"
    />

    <SidebarItem
     icon={CreditCard}
     label="Finance"
     href="/dashboard/finance"
    />

    <SidebarItem
     icon={BarChart}
     label="Reports"
     href="/dashboard/reports"
    />

    <SidebarItem
     icon={Bot}
     label="AI Assistant"
     href="/dashboard/assistant"
    />

   </nav>

   {/* Footer */}

   <div className="mt-auto p-4 border-t">

    <SidebarItem
     icon={Settings}
     label="Settings"
     href="/dashboard/settings"
    />

   </div>

  </aside>

 )

}