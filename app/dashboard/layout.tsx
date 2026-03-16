import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"

export default function Layout({
 children
}:{
 children:React.ReactNode
}){

 return(

  <div className="flex h-screen">

   <Sidebar/>

   <div className="flex-1 flex flex-col">

    <Header/>

    <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">

     {children}

    </main>

   </div>

  </div>

 )

}