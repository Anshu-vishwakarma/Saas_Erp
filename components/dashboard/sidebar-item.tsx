"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarItemProps {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  href: string;
}

export default function SidebarItem({
 icon: Icon,
 label,
 href
}: SidebarItemProps){

 const pathname = usePathname()

 const active = pathname === href

 return(

  <Link
   href={href}
   className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition

   ${active
     ? "bg-gray-200 font-medium"
     : "hover:bg-gray-100"}
   `}
  >

   <Icon size={18}/>

   {label}

  </Link>

 )

}