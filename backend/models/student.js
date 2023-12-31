const mongoose=require("mongoose");
const student=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    moblieNo:{
        type:String,
    },
    name:{
type:String,
required:true,
    },
    rollNo:{
        type:String,
        required:true,
    },
    
    attendence:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"date",
    },],
},{timestamps:true});
module.exports=mongoose.model("studnet",student);



