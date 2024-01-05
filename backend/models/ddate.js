const mongoose=require("mongoose");
const date=new mongoose.Schema({
    Date:{
       type:String, 
       required:true,
    },
    time:{
        type:String,
        required:true,
    },
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"classes",
    },
      attendence:{
        type:String,
        default:"N",

    },
},{timestamps:true});
module.exports=mongoose.model("date",date);


