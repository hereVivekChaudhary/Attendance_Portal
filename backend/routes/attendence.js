const express=require("express");
const router=express.Router();


// importing controlleres

const {createClass,addStudent,updateAttendence,showSingleClass,showAllClasses,markAttendence,showSingleStudentAttendence,updateStudentDetails,showSingleStudent}=require("../controls/attendence");

// creating class 
router.post("/createClass",createClass);

//add student in class
router.post("/addStudent",addStudent);

// show all the class
router.post("/showAllClasses",showAllClasses);


// show attendence table
router.post("/studentTable",showSingleClass);

//submitting attendence

router.post("/submitAttendence",markAttendence);

//update attendence
router.post("/updateAttendence",updateAttendence);

//show single student attendence
router.post("/showSingleStudentAttendence",showSingleStudentAttendence);

//update student details

router.post("/updateStudentDetails",updateStudentDetails);

// giving single student detials

router.post("/singleStudentDetails",showSingleStudent);

module.exports=router;