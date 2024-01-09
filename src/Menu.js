import React from "react";
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdSecurityUpdateGood } from 'react-icons/md';
import { MdUpdate} from 'react-icons/md';
import { Link ,useParams} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
const Menu=()=>{
  const {id}=useParams();
    return (<div className="  flex justify-center items-center text-white flex-wrap">
<Link to={`/markAttendence/${id}`} >
    <div className="m-2 p-2  bg-green-400 w-[10rem]  rounded ">
      {/* mark */}
     
      <MdSecurityUpdateGood/>
      <p>Mark attendence</p>
    </div>
    </Link>
    <Link to={`/updateAttendence/${id}`}>
    <div className="m-2 p-2  bg-green-400 w-[10rem]  rounded " >
      {/* update */}
      <MdUpdate/>
    <p>Update attendence</p>
    </div>
    </Link>
    <Link to={`/AddStudent/${id}`}>
    <div className="m-2 p-2  bg-green-400 w-[10rem]  rounded " >
      {/* update */}
      <AiFillPlusCircle />
    <p>Add student</p>
    </div>
    </Link>

    <Link to={`/editDetails/${id}`}>
    <div className="m-2 p-2  bg-green-400 w-[10rem]  rounded " >
      {/*Edit*/}
      <FaEdit />
    <p>Edit Details</p>
    </div>
    </Link>


    
    </div>)
}
export default Menu;