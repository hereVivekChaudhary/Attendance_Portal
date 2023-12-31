import React ,{useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import download from "./assets/download.jpeg";

const FormType=()=>{
    let {formtype}=useParams();
    console.log(formtype);
    console.log(formtype);
    const {register,handleSubmit}=useForm();

    return(
        <div className="  w-[100vw] h-[100vh] flex justify-center items-center">
            <div  className=" flex rounded-xl  bg-green-500 p-3  h-[20rem]">


{/* login */}
<div className=" w-[50%]  bg-pink-500  rounded-l-2xl  ">
   {formtype==="login" && <div className=" text-white p-4">
        <h1>Login</h1>
    <form className=" w-fit">
       <div className=" flex">
        {/* another way of login */}
        <img src="https://img.icons8.com/ios/50/000000/google-logo.png" alt='goggle'/>
        <img src="https://img.icons8.com/ios/50/000000/github" alt='github'/>
       </div>
            <div>
            <input type="email" name="username" id="username" placeholder="    Email" className="border-2 border-black"/>
            </div>
            <div>
            <input type="password" name="password" id="password" placeholder="    Password" className="border-2 border-black"/>
         </div>
         <Link to="/user/signup">  <p>Don't have an account? Sign up</p></Link>
         <p>
          <Link to="/user/forgotpassword">Forgot Password?</Link>
          </p>
        <button type="submit">Login</button>
    </form>
    </div>
}
{
    !(formtype==="login") && <div className=" text-white  ">
     <img src={download} alt="attendence" className=" object-cover w-full h-[18.5rem]" />

        </div>
}
</div>
{/* signup */}
<div className=" w-[50%]  bg-red-600 rounded-r-2xl  " >

{!(formtype==='login') && <div className=" text-white p-4  flex flex-col  items-center  ">
        <h1>Sign up</h1>
    <form className=" flex flex-col gap-1">
       <div className=" flex">
        {/* another way of login */}
        <img src="https://img.icons8.com/ios/50/000000/google-logo.png" alt='goggle'/>
        <img src="https://img.icons8.com/ios/50/000000/github" alt='github'/>
       </div>
       <div className="flex gap-1 ">
  <input type="text" name="Firstname" id="Firstname" placeholder="   First Name" className=" border-2 border-black w-[50%]" />
  <input type="text" name="Lastname" id="Lastname" placeholder="   Last Name" className=" border-2 border-black w-[50%]" />
</div>

      
            <input type="email" name="username" id="username" placeholder="    Email" className="border-2 border-black  "/>

          
            <input type="password" name="password" id="password" placeholder="    Password" className="border-2 border-black "/>
      
         <p>
         
          </p>
          <Link to="/user/login">  <p>Already have an account? Login</p></Link>
        <button type="submit">Sign up</button>
    </form>
    </div>
}
{
    formtype==='login' && <div className=" text-white ">
     <img src={download} alt="attendence" className=" object-cover w-full h-[18.5rem]" />

        </div>
}
</div>
            </div>
        </div>
    )
}
export default FormType;