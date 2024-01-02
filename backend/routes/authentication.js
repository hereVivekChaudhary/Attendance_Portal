const express=require("express");
const router=express.Router();
const authentication=require("../controls/auth");
const {signup,login,sendOtp}=authentication;
const {authorization}=require("../middleware/auth");


router.post("/signup",signup);
router.post("/login",login);
router.post("/sendOtp",sendOtp);



module.exports=router;
