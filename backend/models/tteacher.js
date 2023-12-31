const mongoose=require("mongoose");
const Instructor=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    classes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"classes",
    }],
},{timestamps:true});

module.exports=mongoose.model("Instructor",Instructor);



// Mongoose timestamps are supported by the schema. Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true. When set to true, the mongoose creates two fields as follows:

// createdAt: Date representing when the document was created
// updatedAt: Date representing when this document was last updated