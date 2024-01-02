const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const teacher = require("../models/teacher");
const otp = require("../models/otp");
const optGenerator=require("otp-generator");
const mailSender=require("../mail/mailSender");
const updatePassword=require("../mail/updatePassword");
const crypto=require("crypto");
require("dotenv").config();
//signup
exports.signup = async (req, res) => {
    try{
        
        Object.entries(req.body).forEach(([key, value]) => {
      if (!value) {
        return res.status(400).json({ error: `${key} is required` });
      }
    });

    const { email, password,confirmPassword, firstname,lastname } = req.body;
  
    
     if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn't match" });
    }
    const user = await teacher.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    //find otp
    const otpData = await otp.findOne({ email }).sort({ createdAt: -1 }).limit(1);
    if (!otpData) {
      return res.status(400).json({ error: "OTP not found" });
    }
    else if(otpData.otp!==req.body.otp){
      return res.status(400).json({ error: "OTP not matched" });

    }
    // Hash the password
    const hashedPassword = await bycrypt.hash(password, 12);

    // create the user

    await teacher.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {   
    return res.status(500).json({ error: err.message,message:"error in signup" });
    }
  };

  //login

    exports.login = async (req, res) => {
        try{
            Object.entries(req.body).forEach(([key, value]) => {
                if (!value) {
                  return res.status(400).json({ error: `${key} is required` });
                }
              });
              //find user
              const { email, password } = req.body;
                const user = await teacher.findOne({ email });
                if (!user) {
                  return res.status(400).json({ error: "Invalid Credentials" });
                }
                //check password
                const isPasswordCorrect = await bycrypt.compare(password, user.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

                   user.token=token;
                   user.password=undefined;
                   //create cookie
                   const cookieOptions={
                    //in minutes
                    expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*60*1000),
                    httpOnly:true
                }
                res.cookie('jwt',token,cookieOptions);
                    return res.status(200).json({result:user,token});
            }
                else
                {
                    return res.status(400).json({ error: "Invalid Credentials" });
                }
                
        }
        catch(err){
            return res.status(500).json({ error: err.message,message:"error in login" });
        }
    }

    // send otp
    exports.sendOtp=async(req,res)=>{
        try{
//check if user already exists
        const { email } = req.body;
        const user = await teacher.findOne({ email });
        if (user) {
          return res.status(400).json({ error: "Email already exists" });
        }
        //generate otp
        let otp=optGenerator.generate(6,{upperCase:false,specialChars:false});
        //check if otp already exists
        let otpData = await otp.findOne({ otp:otp });
        while(otpData){
          otp=optGenerator.generate(6,{upperCase:false,specialChars:false});
          otpData = await otp.findOne({ otp:otp });
        }
        //create otp
        await otp.create({
          email,
          otp,
        });
        

        }catch(err){
            return res.status(500).json({ error: err.message,message:"error in send otp" });
        }
    }
    //change password
    exports.changePassword=async(req,res)=>{
      try{
      Object.entries(req.body).forEach(([key, value]) => {
        if (!value) {
          return res.status(400).json({ error: `${key} is required` });
        }
      })
      // get user old password
      const userDetails=await teacher.findById(req.user.id);
 const {oldPassword,newPassword}=req.body;
 if(oldPassword===newPassword){
  return res.status(400).json({ error: "Old password and new password can't be same" });
  }
      //validating old password
      const isPasswordCorrect = await bycrypt.compare(oldPassword, userDetails.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      // updata password
      const hashedPassword = await bycrypt.hash(newPassword, 12);
     await teacher.findByIdAndUpdate(req.user.id,{password:hashedPassword},{new:true});
      
      //send notification
      const mailResponse=await mailSender(userDetails.email," your password has been changed",updatePassword(userDetails.email,userDetails.firstname,userDetails.lastname));
      console.log("Email sent successfully",mailResponse.response);
      return res.status(200).json({message:"password changed successfully"})

    }
      catch(err){
        return res.status(500).json({ error: err.message,message:"error in change password" });
      }
    }

    // Generate url for forgot password
    exports.generateUrl=async(req,res)=>{

      try{
        const {email}=req.body
        //check if ueser exists
        const user=await teacher.findOne({email});
        if(!user){
          return res.status(400).json({ error: "Email doesn't exists" });
        }
        //generate token
        const token=crypto.randomBytes(32).toString('hex');
        const updateUserDetails=await teacher.findOneAndUpdate({email},{token:token,expriesOfUrl:Date.now()+3600000},{new:true});
        console.log(updateUserDetails);

        const url=`http://localhost:3000/resetPassword/${token}`;

        //send mail
        await mailSender(email,"Reset Password",`Click on the link to reset your password ${url}`);
        return res.status(200).json({message:"url sent successfully"});

      }catch(err){
        return res.status(500).json({ error: err.message,message:"error in generate url" });
      }
    }

    //reset password
    exports.resetPassword=async(req,res)=>{
       try{
        Object.entries(req.body).forEach(([key, value]) => {
          if (!value) {
            return res.status(400).json({ error: `${key} is required` });
          }
        })
const {token,password,confirmPassword}=req.body;
if(password!==confirmPassword){
  return res.status(400).json({ error: "Password doesn't match" });
}

// check if token exists
const user=await teacher.findOne({token:token});
if(!user){
  return res.status(400).json({ error: "Invalid token" });
       }
       //check if token is expired
        if(user.expriesOfUrl<Date.now()){
          return res.status(400).json({ error: "Token expired" });
        }
      //hash password
      const hashedPassword=await bycrypt.hash(password,12);
//update password
await teacher.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
return res.status(200).json({message:"password reset successfully"});


      }catch(err){
        return res.status(500).json({ error: err.message,message:"error in reset password" });

       }
    }

  
  