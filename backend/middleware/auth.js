const jwt = require("jsonwebtoken");
require("dotenv").config();
//
exports.authorization=async(req,res,next)=>{
    try{
const token=req.header("Authorization");
if(!token){
    return res.status(401).json({error:"Unauthorized"});
}
const decode=jwt.verify(token,process.env.JWT_SECRET);
if(!decode){
    return res.status(401).json({error:"Unauthorized"});
}
req.user=decode;
next();
    }catch(err){
        return res.status(500).json({success:false,
            message:"error in authorization"});
    }

    
}