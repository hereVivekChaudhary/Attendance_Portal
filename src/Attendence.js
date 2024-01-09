import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {updateAttendence, showSingleStudentAttendence} from './operations/attendenceApi';
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";



const Attendance = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [student, setStudent] = useState([]);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const { id } = useParams();

  // fetching single student attendance
  useEffect(() => {
    const fetchData = async () => {
      const data = { id: id };
      const response = await dispatch(showSingleStudentAttendence(data));
      console.log("responseAttend",response.data);
      setStudent(response.data);
    };
    fetchData();
  }, [id, dispatch]);
  console.log("student",student);

  const optionsD = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata', // Set the time zone to Indian Standard Time
    hour12: false, // Use 24-hour format
    
  };
  const date=new Date();
  const indianDate = date.toLocaleDateString('en-IN', optionsD);



  const onSubmit = (data) => {
    console.log("****** ",data);
    const submitData = [];
    for(let [key,value] of Object.entries(data)){
submitData.push({id:key,Date:indianDate,mark:value?'P':'A'});
console.log("key "+key+"  "+"value "+value);
    }
    console.log("submitData",submitData);
    dispatch(updateAttendence(submitData,navigate));
   
  };


student.forEach((element)=>{
    console.log("element ", element._id);
    setValue(`${element._id}`, element.attendence==='P'?true:false);
}
    )

  return (
    <div>
      <h1>Edit Attendance</h1>
      <div className=" bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">S.R No</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Attendance</th>
              <th className="border border-gray-300 px-4 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {student.map((element, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{element.Date}</td>
                <td className="border border-gray-300 px-4 py-2">{element.time}</td>
                <td className="border border-gray-300 px-4 py-2">{element.attendence}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    {...register(`${element._id}`,)}
                    onChange={(e) => {
                      setValue(`${element._id}`, e.target.checked);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        <button className=" p-1 m-1 bg-green-500 rounded" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Attendance;
