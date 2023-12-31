import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ToggleBtn from "./Toggle";
import "./App.css";

const Sheet=()=>{
    const details=[
        {
          rollNo:"1",
          name:"vineet singh",
       
          email:"vineetkumarsingh3418@",
          Date:[{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:"curr",mark:"p"}],
        },
        {
          name:"vineet1 singh",
          rollNo:"2",
        
          email:"vineetkumarsingh3471@",
          Date:[{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:"curr",mark:"p"}],
        },
        {
          name:"vineet2 singh",
          rollNo:"3",
         
          email:"vineetkumarsingh34114@",
          Date:[{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:"curr",mark:"p"}],
        },
        {
          name:"vineet3 singh",
          rollNo:"4",
         
          email:"vineetkumarsingh34122@",
          Date:[{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:"curr",mark:"p"}],
        },
        {
          name:"vineet4 singh",
          rollNo:"5",
         
          email:"vineetkumarsingh341@",
          Date:[{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:1,mark:"p"},{date:"curr",mark:"p"}],
        },
      
      ]
      
      
      const [allcheck,setAllCheck]=useState(true);
      
      const {register,handleSubmit,setValue,getValues}=useForm();
      console.log(new Date().getDate());
      const onSubmit=(data)=>{
        console.log(data);
      }
      
      
      const handleSelectAll = () => {
        const allValues = getValues(); // Get the current form values
        setAllCheck(!allcheck);
        for (const key in allValues) {
          setValue(key, allcheck); // Set all checkboxes to true
        }
      };
return (
<div>
  <div className="w-fit ">
    <ToggleBtn isOn={allcheck} handleSelectAll={handleSelectAll}/>
    </div>
<div className="flex  bg-red-700 text-center w-fit  ">
  {
    Object.keys(details[0]).map((label,index)=>(
      <div className={`${!Date?' w-fit':''}`}  key={index} >
      <div className=" border text-center bg-yellow-400 p-1">{label}</div>
{
  details.map((student,key)=>(
 label!=='Date'? (<div className=" text-white border p-1"  key={student.rollNo}>{student[label]}</div>):(<div className=" flex border "  key={student.rollNo}>
{
  student[label].map((attend,index)=>(<div  className="p-[0.20rem] border" key={index}>
    {
    
    attend.date<Date.now()?(<div>{attend.mark}</div>):(<div>
    <input
            type="checkbox"
            id={`${student["rollNo"]}`}
            value="a"
            {...register(student["rollNo"])}
            className="mr-2"
          />
      
    </div>)
  
  
  }
  </div>))
}
 </div>)
  
  ))
}

      </div>
    ))
  }


</div>

<div>

</div>
</div>
)
}
export default Sheet;
