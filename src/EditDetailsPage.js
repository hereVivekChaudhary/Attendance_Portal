import React, { useEffect, useState } from "react";


import {useParams} from "react-router-dom";
import { showSingleStudent,updateStudentDetails } from "./operations/attendenceApi";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const EditDetailsPage=()=>{
   const {id}=useParams();
   // const [student,setStudent]=useState([]);
   const dispatch=useDispatch();
const {register,handleSubmit,setValue}=useForm();

 function setInputFields(data){
   setValue("name",data.name);
   setValue("rollNo",data.rollNo);
   setValue("email",data.email);
   setValue("phone",data.phone);
   setValue("address",data.address);

}
   useEffect(()=>{
const fetch=async()=>{
   console.log("id=====",id)
const response=await dispatch(showSingleStudent({id:id}));
console.log(response.data);

setInputFields(response.data);
}
fetch();
   },[]);


   //******************* */
   const submitData= async(data,navigate)=>{ 
      console.log(data);
      data.id=id;
     dispatch(updateStudentDetails(data,navigate));
   
   };

   return (




<div className=" h-[calc(100vh-48px)] pt-2 w-full">
    <div>
<form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(submitData)}>
   <input className="border border-gray-300 px-4 py-2" type="text" placeholder="  Name" {...register("name")} onChange={(e)=>setValue("name",e.target.value)}/>
   <input className="border border-gray-300 px-4 py-2" type="text" placeholder="  Roll No" {...register("rollNo")} onChange={(e)=>setValue("rollNo",e.target.value)} />
   <input className="border border-gray-300 px-4 py-2" type="text" placeholder="  Email" {...register("email")} onChange={(e)=>setValue("email",e.target.value)}/>
   <input className="border border-gray-300 px-4 py-2" type="text" placeholder="  Phone" {...register("phone")} onChange={(e)=>setValue("phone",e.target.value)}/>
   <input className="border border-gray-300 px-4 py-2" type="text" placeholder="  Address" {...register("address")} onChange={(e)=>setValue("address",e.target.value)}/>
   <button className="border border-gray-300 px-4 py-2 bg-green-400 m-1" type="submit">Submit</button>
   </form>
        
    </div>


</div>

   )

}

export default  EditDetailsPage;