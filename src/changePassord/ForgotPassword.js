import React from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../operations/authApi";
import { useDispatch } from "react-redux";


const ForgotPassword=()=>{
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        console.log(data);
        dispatch(forgotPassword(data));
        reset();
    };
 return(
    <div className="h-[calc(100vh-48px)] flex justify-center items-center ">

        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col">
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className={`border-2 border-black h-10 rounded w-56${
                    errors.email ? "border-red-500" : ""
                    }`}
                    {...register("email", { required: "Email is required" })}

                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}
                <button
                    type="submit"
                    className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-fit"
                >
                    Submit
                </button>
            </form>
        </div>
        </div>
 )
 
}
export default ForgotPassword;