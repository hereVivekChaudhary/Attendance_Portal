import React from "react";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Logout } from "./operations/authApi"
const Navbar = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isLogin=useSelector((state)=>state.auth.user);
    const firstname=isLogin?.firstname;
console.log("navbar" , firstname);
function handleLogout() {
         dispatch(Logout(navigate));
      }
    return(
        <div className="  h-12 bg-green-400  ">
<div className=" flex justify-between">
    {/* logo */}
    <div className="pl-1">
{/* attendence logo */}
<Link to="/">
<img src="https://5.imimg.com/data5/SELLER/Default/2022/3/DZ/AG/TW/32094369/attendance-management-software.png" alt="logo" className="h-12 w-12 rounded"/>
</Link>
    </div>
    {/* option */}
    <div className=" py-1 flex">
{! isLogin && <div>
    <Link to="/user/login">
        <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
    Login   
    </button>
    </Link>
    <Link to="/user/signup">
    <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
    Signup
    </button>
   
    </Link>
    </div>
    
}

    {isLogin && <div className="flex gap-2">

        <div className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"> {firstname} </div>
        <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
    Logout
    </button>
    </div>
}
  
    </div>
</div>
        </div>
    )
}
export default Navbar;