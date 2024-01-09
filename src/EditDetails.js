import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showSingleClass} from './operations/attendenceApi';
import { Link, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";

const EditDetails=()=>{
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
<div className=" h-[calc(100vh-48px)] w-full pt-1">
        <div className="bg-red-400  text-center rounded ml-3 mr-3 overflow-x-auto scrollbar-hidden " >
        <h2 className="text-white text-2xl">List of Students (click on green block  to modify)</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Roll No</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 bg-green-500">
                    <Link to={`/editDetailsPage/${student._id}`}>{student.name}</Link></td>
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
      )
    }
    export default EditDetails;