import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({

 name:String,
 course:String,
 fees:Number

})

export default mongoose.models.Student ||
mongoose.model("Student",StudentSchema)