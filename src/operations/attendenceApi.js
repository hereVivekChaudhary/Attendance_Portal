import React from "react";
import {userendpoints} from './apis';
import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { setLoading } from "../reduxslice/authSlice";

const {CREATE_CLASS,ADD_STUDENT,SHOW_ALL_CLASSES,SHOW_SINGLE_CLASS,MARK_ATTENDENCE,UPDATE_ATTENDENCE}=userendpoints;

// Create Class

export const createClass =  (data,navigate) => {
 
return  async(dispatch)=>{
    dispatch(setLoading(true));
    const toastId = toast.loading("Creating Class");
  try {
    const res = await apiConnector("POST",CREATE_CLASS, data);
    if (res.status === 200) {
      toast.success("Class Created Successfully");
      console.log("res.data",res.data);
      navigate(`/AddStudent/${res.data._id}`)
    }
    
  } catch (err) {
    
    toast.dismiss(toastId);
    toast.error("Class Creation Failed");
    return err;
  }
  toast.dismiss(toastId);
  dispatch(setLoading(false));
    
}
};

//add student 

export const addStudent =  (data,navigate) => {
  console.log("data add",data);
    return async(dispatch)=>{
    dispatch(setLoading(true));
    const toastId = toast.loading("Adding Student");
  try {
    const res = await apiConnector("POST",ADD_STUDENT, data);
    if (res.status === 200) {
      toast.success("Student Added Successfully");
      navigate('/');
    }
  } catch (err) {
    toast.error("Student Addition Failed");
  }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
}
};

//show all classes

export const showAllClasses =  (data) => {

    return async(dispatch)=>{
     
    dispatch(setLoading(true));
    const toastId = toast.loading("Showing Classes");
  try {
    const res = await apiConnector("POST",SHOW_ALL_CLASSES,data);
    if (res.status === 200) {
      console.log("res.data",res);
      toast.dismiss(toastId);
    dispatch(setLoading(false));
      return res.data;
    }
  } catch (err) {
    toast.dismiss(toastId);
    return err;
  }

    
}
};

//show single class

export const showSingleClass =  (data) => {

    return async(dispatch)=>{
        dispatch(setLoading(true));
    const toastId = toast.loading("Loading Details");
    try {
      console.log("data1",data);
        const res = await apiConnector("POST",SHOW_SINGLE_CLASS, data);
        if (res.status === 200) {
        toast.success("Details Loading successfully");
        toast.dismiss(toastId);
        return res;
        }
    } catch (err) {
      toast.dismiss(toastId);
        return err;
    }
      
}
    };

//mark attendence
 
export const markAttendance = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Marking Attendance");
    try {
     

      const res = await apiConnector("POST", MARK_ATTENDENCE, data);

      if (res.status === 200) {
        console.log("res ", res);
     
        toast.success("Attendance Marked Successfully");
        navigate('/');
      } else {
        // Handle other response statuses if needed
        dispatch(setLoading(false));
     
        toast.error("Attendance Marking Failed");
      }

    } catch (err) {
      console.error("Error marking attendance: ", err);
      toast.error("Attendance Marking Failed");
    } finally {
    toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
};



//update attendence

export const updateAttendence = async (data,navigate) => {
    return  async(dispatch)=>{
        setLoading(true);
    const toastId = toast.loading("Updating Attendence");
    try {
        const res = await apiConnector("POST",UPDATE_ATTENDENCE, data);
        if (res.status === 200) {
        toast.success("Attendence Updated Successfully");
        return res.data;
        }
    } catch (err) {
        toast.error("Attendence Update Failed");
        return err;
    }
        setLoading(false);
        toast.dismiss(toastId);
}
    };

    