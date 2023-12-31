const express=require("express");
const router=express.Router();

// importing controlleres
const {addStudent,updateAttendence,showSingleClass,showAllClasses,markAttendence}=require("../controls/attendence");

// creating class and adding students
router.post("/createClass",addStudent);

// show all the class
router.get("/showAllClass",showAllClasses)


// show attendence table
router.get("/studentTable",showSingleClass);

//submitting attendence

router.post("/submitAttendence",markAttendence);

//update attendence
router.post("/updateAttendence",updateAttendence);

module.exports=router;