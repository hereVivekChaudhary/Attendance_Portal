import React, { useState } from "react";
import "./script";
const ToggleBtn = ({ isOn,handleSelectAll }) => {
  console.log(isOn);
  const [move,isMove]=useState(true);
  function clickHandler(){
    console.log(move);
isMove(!move);
  }
  return (
    <div className=" bg-teal-400 w-[3.3rem] h-6  rounded-full relative btn " id="myDiv" onClick={()=>
    {handleSelectAll();
        clickHandler();
    }}>
        <span className={`bg-blue-600 w-6 h-4 my-[4px] mx-[2px] rounded-full absolute  duration-300 ease-in-out${move? " translate-x-[100%]":""}`} id="move"></span>
        <div className="flex text-[0.8rem] mx-[2.2px] pt-[1px] gap-[2px]">
<p>✔️</p>
<p className="ml-1">❌</p>
        </div>
    </div>
  );
};

export default ToggleBtn;
