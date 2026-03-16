import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StatsCards(){

 const stats = [
  {title:"Students",value:"320"},
  {title:"Revenue",value:"₹45000"},
  {title:"Pending Fees",value:"₹80000"},
  {title:"Batches",value:"12"}
 ]

 return(

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

   {stats.map((s,i)=>(
    <Card key={i}>

     <CardHeader>

      <CardTitle className="text-sm text-gray-500">
       {s.title}
      </CardTitle>

     </CardHeader>

     <CardContent>

      <p className="text-2xl font-bold">
       {s.value}
      </p>

     </CardContent>

    </Card>
   ))}

  </div>

 )

}