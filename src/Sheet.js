import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSingleClass,markAttendance } from "./operations/attendenceApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sheet = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [allPresent, setAllPresent] = useState(false);
  const navigate = useNavigate();

   // **********************************
   const date = new Date(); 

   const optionsD = {
     year: 'numeric',
     month: 'long',
     day: 'numeric',
     timeZone: 'Asia/Kolkata', // Set the time zone to Indian Standard Time
     hour12: false, // Use 24-hour format
     
   };
    const optionsT = { 
      hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
   
   const indianDate = date.toLocaleDateString('en-IN', optionsD);
   const indianTime = date.toLocaleTimeString('en-IN', optionsT);

   console.log("indianTime",indianTime );
   
     // **********************************

  useEffect(() => {
    const fetchData = async () => {
      const data = { id: id };
      const response = await dispatch(showSingleClass(data));
      setStudents(response.data.data);
    };
    fetchData();
  }, [id, dispatch]);

  const handleCheckboxChange = (studentId, isChecked) => {
    setValue(studentId, isChecked);
  };

  const handlePresentAllClick = () => {
    setAllPresent(!allPresent);
    students.forEach((student) => {
      setValue(student._id, allPresent);
    });
  };

  const onSubmit = (data) => {
  
    const attendance = [];
    for (const [key,value] of Object.entries(data)) {
      attendance.push({id: key, mark: value?'P':'A',Date:indianDate ,classId:id,time:indianTime});
  
  };
  console.log("attendance",attendance)
  dispatch(markAttendance({attendence:attendance},navigate));
  };
  return (
    <div className="m-1 bg-green-400">
      <div className="bg-red-400 text-center rounded ml-3 mr-3 overflow-x-auto scrollbar-hidden">
        <h2 className="text-white text-2xl">List of Students</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">S.R No</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Roll No</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.rollNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.address}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-green-600"
                      {...register(`${student._id}`)}
                      onChange={(e) => handleCheckboxChange(student._id, e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center m-1">
            <button className="bg-green-900 text-white rounded-md p-1" type="submit">
              Submit
            </button>
            <div className="bg-green-900 text-white rounded-md p-1 m-1" onClick={handlePresentAllClick}>
              Present All
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sheet;
