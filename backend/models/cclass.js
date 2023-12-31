const mongoose=require("mongoose");
const classes=new mongoose.Schema({
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },
    standard:{
type:String,
required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"studnet",
    },],
},{timestamps:true});
module.exports=mongoose.model("classes",classes);



