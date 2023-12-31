import React from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const CreateClass = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  
  const shadowStyle = {
    boxShadow: '18px 18px 87px #16ad28, -18px -18px 86px #1ee936',
  };

  const onSubmit = (data) => {
    console.log(data); // Log the form data
    navigate("/addStudent");
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-green-500 text-center p-5 rounded-[19px]" style={shadowStyle}>
        <h1 className="text-white">Create Class</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="text-white">Enter class standard <span className="text-red-700">*</span></p>
            <input
              type="text"
              placeholder="12"
              className="rounded-md"
              {...register("classStandard", { required: true })}
            />
          </div>

          <div>
            <p className="text-white">Enter class timing <span className="text-red-700">*</span></p>
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="start(10)"
                className="rounded-md"
                {...register("startTime", { required: true })}
              />
              <input
                type="text"
                placeholder="end(11)"
                className="rounded-md"
                {...register("endTime", { required: true })}
              />
            </div>
          </div>

          <button className="bg-white text-green-500 rounded-md p-1 border border-black" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
