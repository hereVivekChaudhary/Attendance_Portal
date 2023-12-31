import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const AddStudent = () => {
  const { register, handleSubmit, reset,formState:{errors} } = useForm();
  const [students, setStudents] = useState([]);
  const  boxShadow ={
    boxShadow:  '10px 10px 100px #d36060,-10px -10px 80px #ff8282',
  }

  const onSubmit = (data) => {
    // Creating a student object
    const student = { ...data };
 

    // Updating the list of students
    setStudents((prevStudents) => [...prevStudents, student]);

    // Logging the student details to the console
    console.log(student);

    // Clearing the form after submission
    reset();
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <h1 className="text-2xl text-white text-center">Add Student</h1>
      {/* Form */}
      <div className="bg-red-400 mx-auto p-4 ml-3 mr-3  rounded" style={boxShadow}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-1 flex-wrap">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border border-black rounded-md"
              {...register("name", { required: true })}
            />
<input
  type="text"
  name="rollNo"
  placeholder="Roll No"
  className={`border border-black rounded-md ${errors.rollNo ? "border-red-500" : ""}`}
  {...register("rollNo", { required: 'Roll No is required' })}
/>
{/* {errors.rollNo && (
  <p className="text-red-500 text-sm relative top-[-20px] right-[]">{errors.rollNo.message}</p>
)} */}

          
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="border border-black rounded-md"
              {...register("email", { required: true })}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              className="border border-black rounded-md"
              {...register("phone", { required: true })}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="border border-black rounded-md"
              {...register("address", { required: true })}
            />
            <button className=" bg-green-900 text-white rounded-md p-1" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>

      {/* List of Students */}
      <div className="bg-red-400 h-[300px] text-center rounded ml-3 mr-3 overflow-x-auto " style={boxShadow}>
  <h2 className="text-white text-2xl">List of Students</h2>
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
          <td className="border border-gray-300 px-4 py-2">{student.name}</td>
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
};

export default AddStudent;
