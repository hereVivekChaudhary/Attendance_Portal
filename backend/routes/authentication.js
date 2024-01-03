const express=require("express");
const router=express.Router();
const authentication=require("../controls/auth");
const {signup,login,sendOtp,changePassword,generateUrl,resetPassword}=authentication;
const {authorization}=require("../middleware/auth");


router.post("/signup",signup);
router.post("/login",login);
router.post("/sendOtp",sendOtp);

//change password
router.post("/changePassword",authorization,changePassword);

//forgot password
router.post("/forgotPassword",generateUrl);
router.post("/resetPassword",resetPassword);




module.exports=router;
