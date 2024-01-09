import React, { useState } from "react";
import {useEffect} from 'react';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showSingleClass } from "./operations/attendenceApi";
import { Link } from "react-router-dom";
import "./App.css";


const UpdateAttendence=()=>{
    const dispatch = useDispatch();
    const [students, setStudents] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
          const data = { id: id };
          const response = await dispatch(showSingleClass(data));
          setStudents(response.data.data);
          console.log("response",response.data.data);
        };
        fetchData();
      }, [id, dispatch]);
      return (
        <div className="m-1 bg-green-400">
          <div className="bg-red-400 text-center rounded ml-3 mr-3 overflow-x-auto scrollbar-hidden">
            <h2 className="text-white text-2xl">List of Students (click on green block to modifiy)</h2>
           
            <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">S.R No</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Roll No</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Phone</th>
          <th className="border border-gray-300 px-4 py-2">Address</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index} >
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-300 bg-green-500 px-4 py-2">
              <Link to={`/Attendence/${student._id}`}>{student.name}</Link>
            </td>
            <td className="border border-gray-300 px-4 py-2">{student.rollNo}</td>
            <td className="border border-gray-300 px-4 py-2">{student.email}</td>
            <td className="border border-gray-300 px-4 py-2">{student.phone}</td>
            <td className="border border-gray-300 px-4 py-2">{student.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
          </div>
        </div>
      );

}
export default UpdateAttendence;