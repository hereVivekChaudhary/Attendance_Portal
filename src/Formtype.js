import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import download from "./assets/download.jpeg";
import { useDispatch } from "react-redux";
import {setSignupData} from "./reduxslice/authSlice";
import { login } from "./operations/authApi";

import toast from "react-hot-toast";
import { sendOtp } from "./operations/authApi";


const FormType = () => {
  let { formtype } = useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate();
  console.log(formtype);

  const { register, handleSubmit, formState: { errors } ,reset} = useForm();

  const onSubmitLogin = (data) => {
    console.log("Login data:", data);

dispatch(login(data,navigate));
    reset()
  };

  const onSubmitSignUp = (data) => {
    console.log("Sign-up-data:", data);
    if(data.password!==data.confirmPassword ){
        toast.error("Password not  match");
        return;
    }
    
    dispatch(setSignupData(data));
    dispatch(sendOtp(data.email,navigate));
    reset();
  };


  return (
    <div className="h-[calc(100vh-48px)] flex justify-center items-center mx-4">
      <div className="flex rounded-xl bg-green-500 p-3 h-[20rem]">
        {/* login */}
        <div className=" bg-pink-500 rounded-l-2xl text-white flex  justify-center items-center ">
          {formtype === "login" && (
            <div >
              <h1>Login</h1>
              <form onSubmit={handleSubmit(onSubmitLogin)} className="w-fit text-black flex flex-col gap-2 ">
                <div className="flex">
                  <img
                    src="https://img.icons8.com/ios/50/000000/google-logo.png"
                    alt="goggle"
                  />
                  <img
                    src="https://img.icons8.com/ios/50/000000/github"
                    alt="github"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email1"
                    placeholder="Email"
                    className={`border-2 border-black ${errors.email ? 'border-red-500' : ''}`}
                    {...register('email', { required: 'Email is required' })}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password1"
                    placeholder="Password"
                    className={`border-2 border-black ${errors.password ? 'border-red-500' : ''}`}
                    {...register('password', { required: 'Password is required' })}
                  />
                </div>
                <Link to="/user/signup">
                  <p>Don't have an account? Sign up</p>
                </Link>
                <p>
                  <Link to="/forogotPassword">Forgot Password?</Link>
                </p>
                <button type="submit"  className=" bg-green-600 w-fit rounded p-1 text-xl text-white        ">Login</button>
              </form>
            </div>
          )}
          {!(formtype === "login") && (
            <div>
              <img
                src={download}
                alt="attendence"
                className="object-cover w-full h-[18.5rem]"
              />
            </div>
          )}
        </div>
        {/* signup */}
        <div className=" bg-red-600 rounded-r-2xl text-white flex justify-center items-center">
          {!(formtype === "login") && (
            <div>
              <h1 className=" text-center ">Sign up</h1>
              <form onSubmit={handleSubmit(onSubmitSignUp)} className="flex flex-col gap-1 text-black">
                <div className="flex gap-1">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                    className={`border-2 border-black w-[50%] ${errors.firstname ? 'border-red-500' : ''}`}
                    {...register('firstname', { required: 'First Name is required' })}
                  />
           
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    className={`border-2 border-black w-[50%] ${errors.lastname ? 'border-red-500' : ''}`}
                    {...register('lastname', { required: 'Last Name is required' })}
                  />
              
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className={`border-2 border-black ${errors.email ? 'border-red-500' : ''}`}
                  {...register('email', { required: 'Email is required' })}
                />
              
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={`border-2 border-black ${errors.password ? 'border-red-500' : ''}`}
                  {...register('password', { required: 'Password is required' })}
                />
             
                     <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="  Confirm Password"
                  className={`border-2 border-black ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  {...register('confirmPassword', { required: 'Password is required' })}
                />
             
                <Link to="/user/login">
                  <p>Already have an account? Login</p>
                </Link>
                <button type="submit" className=" bg-green-600 w-fit rounded p-1 text-xl text-white        ">Sign up</button>
              </form>
            </div>
          )}
          {formtype === "login" && (
            <div>
              <img
                src={download}
                alt="attendence"
                className="object-cover w-full h-[18.5rem]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormType;
