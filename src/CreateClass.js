import React from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { createClass} from './operations/attendenceApi';


const CreateClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user}=useSelector(state=>state.auth);
  const { register, handleSubmit ,reset} = useForm();
  
let email=user.email;
console.log(email);
  const shadowStyle = {
    boxShadow: '9px 9px 9px #16ad28, -9px -9px 9px #1ee936',
  };

  const onSubmit = (data) => {
data={...data,email:email};
console.log(data); // Log the form data
  dispatch(createClass(data,navigate));
  reset();
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-48px)]">
      <div className="bg-green-500 text-center  rounded-[19px] p-2" style={shadowStyle}>
        <h1 className="text-white">Create Class</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="text-white">Enter class standard <span className="text-red-700">*</span></p>
            <input
              type="text"
              name="standard"
              placeholder="  12"
              className="rounded-md"
              {...register("standard", { required: true })}
            />
          </div>

          <div >
            <p className="text-white">Enter class timing <span className="text-red-700">*</span></p>
            <div className="flex gap-1 flex-col">
              <input
                type="text"
                name="startTime"
                placeholder="  start(10)"
                className="rounded-md"
                {...register("startTime", { required: true })}
              />
              <input
                type="text"
                placeholder="   end(11)"
                name="endTime"
                className="rounded-md"
                {...register("endTime", { required: true })}
              />
             
            </div>
            <p className="text-white">Enter subject <span className="text-red-700">*</span></p>
            <input
              type="text"
              name="subject"
              placeholder="  Maths"
              className="rounded-md"
              {...register("subject", { required: true })}
            />
          </div>

          <button className="bg-white text-green-500 rounded-md p-1 border border-black mt-1" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
