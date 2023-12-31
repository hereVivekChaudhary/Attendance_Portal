const mongoose=require("mongoose");
const date=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now(),
    },
      attendence:{
        type:String,
        default:"N",

    },
},{timestamps:true});
module.exports=mongoose.model("date",date);



