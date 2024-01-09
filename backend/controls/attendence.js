const studentModel=require("../models/student");
const teacherModel=require("../models/tteacher");
const dateModel=require("../models/ddate");
const classModel=require("../models/cclass");


//create class
exports.createClass=async(req,res)=>{
//validate
console.log("req.body",req.body);
 const isEmpty=Object.values(req.body).some(element=>!element);
console.log("isEmpty",isEmpty);
 if(isEmpty){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        });
    }
    console.log("create 1");
   try{
  // Create new class entry
  const newClass = new classModel({
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    standard: req.body.standard,
    subject: req.body.subject
});
console.log("create 2");

// Save the new class entry to the database
const classResponse = await newClass.save();
console.log("create 3");
if(!classResponse){
    return res.status(400).json({
        success:false,
        message:"error while creating class"
    })
    }

    console.log("create 4");

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
if(!teacherResponse){
    return res.status(400).json({
        success:false,
        message:"error while creating class"
    })
    }
    console.log("create 5");
    return res.status(200).json({
        success:true,
        message:"class created successfully",
        data:classResponse
    })
}  
    catch(err){
        console.log("err while creating class",err);
        return res.status(500).json({
            success:false,
            message:"error while creating class"

        })
    }
    
}

// add student to the class

exports.addStudent = async (req, res) => {
    console.log("req.body  ",req.body);

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
                address: student.address,
                phone:student.phone,
                // attendence:[],
            });
           
            studentIds.push(createdStudent._id);
        }

        // Add students to the class

        await classModel.findByIdAndUpdate(
            req.body.id,
            { $push: { students: { $each: studentIds } } },
            { new: true }
        ).populate("students").exec();



        return res.status(200).json({
            success: true,
            message: "Students added successfully",
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
    const email= req.body.email;
    console.log("body",req.body);
console.log("email",email);
    if(!email){
        
        return res.status(400).json({
            success:false,
        })
    }
    try{
        
        const response= await teacherModel.findOne({email:email}).populate("classes").exec();
        console.log("response",response);
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
    const classId=req.body.id;
    try{
   const respones = await classModel.findOne({_id:classId}).populate({
    path:"students"
   }).exec();
   console.log("respones",respones);
   return res.status(200).json({
    success:true,
    data:respones.students,
   })
}catch(err){
    console.log("err while fectching single class",err);
    return res.status(400).json({
        success:false,
        message:"error while fetching single class"
    });

}

    
}

exports.markAttendence=async(req,res)=>{
    //attendence array
    try{

        const attendence=req.body.attendence;
        console.log("attendence**************",attendence);
        if(!attendence.length){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            });
        }

        const find= await dateModel.findOne({Date:attendence[0].Date,classId:attendence[0].classId});
        console.log("find",find);
        if(find){
        return res.status(400).json({
            success:true,
            message:"attendence already  marked",
        });
    }

attendence.forEach(async(element)=>{
    // element contain student id and mark it  present or absent

    //create dataModel
    let dateResponse= await dateModel.create({attendence:element.mark,Date:element.Date,classId:element.classId,time:element.time});
    console.log("dateResponse",dateResponse);


     await studentModel.findOneAndUpdate(
        { _id: element.id },
        { $push: { attendence: dateResponse._id } },
        { new: true }
    ).populate("attendence").exec();

})
return res.status(200).json({
    success:true,
    message:"attendence marked successfully",   
});

    }catch(err){
        console.log("error while taking attendence ",err);
    }
}


// updating attendence


// exports.updateAttendence=async(req,res)=>{
//     // attendence array
//     const updateAttendence=req.body.updateAttendence;
//     if(!updateAttendence.length)
//     {
//         return res.status(400).json({
//             success:false,
//             message:"all field are required"
//         });
//     }


    
//     updateAttendence.forEach(async(element)=>{
//         // element contain data model id and mark it  present or absent
// try{
// //create dataModel
//  await dateModel.findOneAndUpdate({_id:element.id},{$set:{attendence:element.mark}});




// }catch(err){
//     console.log("error while updating attendence ",err);
// return  res.status(400).json({
//     success:false,
//     message:"error while updating attendence",
// })
// }
//     })

//     return res.status(200).json({
//         success:true,
//         message:"attendence updated successfully",
//     });

// }


exports.updateAttendence=async(req,res)=>{


    try{


        Object.keys(req.body).forEach((element)=>{
            if(!element)
            {
                return res.status(400).json({
                    success:false,
                    message:"all field are required"
                });
            }   
        });
        console.log("req.body",req.body);
        const data=req.body;

        data.forEach(async(element)=>{
            console.log(element.id);
     const update1=await dateModel.findOneAndUpdate(
            { _id:element.id },
            { Date: element.Date,  attendence: element.mark },
            { new: true } 
          );
          console.log(update1);
        }
        );

        
        return res.status(200).json({
            success:true,
            message:"attendence updated successfully",
        });


    }
    catch(err){
        console.log("error while updating attendence ",err);
    }
}

//give single student attendence
exports.showSingleStudentAttendence=async(req,res)=>{
    const studentId=req.body.id;
    try{
   const respones = await studentModel.findOne({_id:studentId}).populate({
    path:"attendence"
   }).exec();
   console.log("respones",respones.attendence);
   return res.status(200).json({
    success:true,
    data:respones.attendence,
   })
}
catch(err){
    console.log("err while fectching single class",err);
    return res.status.json({
        success:false,
        message:"error while fetching single class"
    });

}
    
        
    }


//show single student detils
 exports.showSingleStudent=async(req,res)=>{
    console.log(req.body);
    try{
   Object.values(req.body).forEach((ele)=>{
    if(!ele){
        return res.status(400).json({
            success:false,
            message:"all field are required",
        }
        )
    }
   });

   const response=await studentModel.findOne({_id:req.body.id});

   if(response)
   {
    return res.status(200).json({
        success:true,
        message:"updated successfully",
        data:response
    })
   }else{
    res.status(400).json({
        success:false,
        message:"error while updating student Details"
    })
   }
    }catch(err){
        res.status(400).json({
            success:false,
            message:"error while updating student Details"
        })
    }
 }

// update student details


exports.updateStudentDetails=async(req,res)=>{
    try{
    Object.values(req.body).forEach((ele)=>{
if(!ele){
    return res.status(400).json({
        success:false,
        message:"All field are required"
    });
}
    });
      await studentModel.findOneAndUpdate({
        _id:req.body.id },{
            name:req.body.name,email:req.body.email,
            phone:req.body.phone,rollNo:req.body.rollNo,
            address:req.body.address,
        },{new:true});

        return res.status(200).json({
            success:true,
            message:"Updated successfully"
        })


    }catch(err){

        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Error while updating details"
        })
    }
};