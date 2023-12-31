// 

const studentModel=require("../models/student");
const teacherModel=require("../models/tteacher");
const dateModel=require("../models/date");
const classModel=require("../models/cclass");

exports.addStudent = async (req, res) => {
    try {
        // Validate request body
        const bodyValues = Object.values(req.body);
        const hasEmptyFields = bodyValues.some(element => !element);
        
        if (hasEmptyFields || !req.body.students.length) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Create new class entry
        const newClass = new classModel({
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            standard: req.body.standard,
            subject: req.body.subject
        });

        // Save the new class entry to the database
        const classResponse = await newClass.save();

        // Create students
        const studentIds = [];
        for (const student of req.body.students) {
            if (!student.email || !student.name || !student.rollNo) {
                return res.status(400).json({
                    success: false,
                    message: "Empty student details"
                });
            }
           

            const createdStudent = await studentModel.create({
                email: student.email,
                moblieNo: student.mobileNo, // Corrected property name
                name: student.name,
                rollNo: student.rollNo,
                // attendence:[],
            });
           
            studentIds.push(createdStudent._id);
        }

        // Add students to the class

        await classModel.findByIdAndUpdate(
            classResponse._id,
            { $push: { students: { $each: studentIds } } },
            { new: true }
        ).populate("students").exec();

        // Update teacher's classes
       const teacherResponse= await teacherModel.findOneAndUpdate(
            { email: req.body.email },
            { $push: { classes: classResponse._id } },
            { new: true }
        ).populate({
            path: "classes",populate:{
                path:"students"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Students added successfully",
            data:teacherResponse
        });
    } catch (error) {
        console.error("Error adding students:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// show all the classes of particular teacher
exports.showAllClasses=async(req,res)=>{


    //teacher email
    const email=req.body.email;

    if(!email){
        return res.status(400).json({
            success:false,
        })
    }
    try{
        
        const response= await teacherModel.findOne({email:email}).populate("classes").exec();
        console.log("response",response);
        console.log(response.startTime);
        console.log("********");
        return res.status(200).json({
            success:true,
            data:response,
         })
    }catch(err){
        console.log("err while showing all the classes",err);
    }

 
}

// show details of single class
exports.showSingleClass=async(req,res)=>{

    // // teacher email
    // const email=req.email;

    // class id 
    const classId=req.body.id;
    try{
   const respones = await classModel.findOne({_id:classId}).populate({
    path:"students.attendence"
   }).exec();
   return res.status(200).json({
    success:true,
    data:respones
   })
}catch(err){
    console.log("err while fectching single class",err);
    return res.status.json({
        success:false,
    });

}

    
}

exports.markAttendence=async(req,res)=>{
    // attendence array
    const attendence=req.body.attendence;
    if(!attendence.length)
    {
        return res.status(400).json({
            success:false,  
            message:"all field are required"
        });
    }


    
    attendence.forEach(async(element)=>{
        // element contain student id and mark it  present or absent
try{
//create dataModel
let dateResponse= await dateModel.create({attendence:element.mark});


let studentUpdate = await studentModel.findOneAndUpdate(
    { _id: element.id },
    { $push: { attendence: dateResponse._id } },
    { new: true }
).populate({
    path: " attendence",populate:{
        path:"attendence"
    }
});


}catch(err){
    console.log("error while taking attendence ",err);
return  res.status(400).json({
    success:false,
    message:"error while taking attendence",
})
}
    })

    return res.status(200).json({
        success:true,
        message:"attendence marked successfully",
    });

}


// updating attendence


exports.updateAttendence=async(req,res)=>{
    // attendence array
    const updateAttendence=req.body.updateAttendence;
    if(!updateAttendence.length)
    {
        return res.status(400).json({
            success:false,
            message:"all field are required"
        });
    }


    
    updateAttendence.forEach(async(element)=>{
        // element contain data model id and mark it  present or absent
try{
//create dataModel
let UpdatedDateResponse= await dateModel.findOneAndUpdate({_id:element.id},{$set:{attendence:element.mark}});




}catch{
    console.log("error while updating attendence ",err);
return  res.status(400).json({
    success:false,
    message:"error while updating attendence",
})
}
    })

    return res.status(200).json({
        success:true,
        message:"attendence updated successfully",
    });

}

