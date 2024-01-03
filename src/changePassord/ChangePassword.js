import React from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "../operations/authApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    data={...data,token}
    dispatch(resetPassword(data,navigate));
    reset();
  };

  return (
    <div className="h-[calc(100vh-48px)] flex justify-center items-center">
      <div>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col">
          <input
            id="password"
            type="password"
            placeholder="Password"
            className={`border-2 border-black ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className={`border-2 border-black ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
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
  );
};

export default ChangePassword;
