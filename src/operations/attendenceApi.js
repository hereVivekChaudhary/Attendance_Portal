import {userendpoints} from './apis';
import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { setLoading } from "../reduxslice/authSlice";

const {CREATE_CLASS,ADD_STUDENT,SHOW_ALL_CLASSES,SHOW_SINGLE_CLASS,MARK_ATTENDENCE,UPDATE_ATTENDENCE,SHOW_SINGLE_STUDENT_ATTENDENCE,UPDATE_STUDENT_DETAILS,SHOW_SINGLE_STUDENT}=userendpoints;

// Create Class

export const createClass =  (data,navigate) => {
 
return  async(dispatch)=>{
    dispatch(setLoading(true));
    const toastId = toast.loading("Creating Class");
  try {
    const res = await apiConnector("POST",CREATE_CLASS, data);
    if (res.status === 200) {
      toast.success("Class Created Successfully");
  
      
      navigate(`/AddStudent/${res.data.data._id}`)
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
  // console.log("data add",data);
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
    console.log("dfd",data);
    const res = await apiConnector("POST",SHOW_ALL_CLASSES,data);
    console.log(res);
    if (res.status === 200) {
      console.log("res.data****  ",res.data.data.classes);
      toast.dismiss(toastId);
    dispatch(setLoading(false));
      return res.data;
    }
  } catch (err) {
    toast.dismiss(toastId);
    console.log("error****   ", err);
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

export const updateAttendence =  (data,navigate) => {
    return  async(dispatch)=>{
        dispatch(setLoading(true));
console.log(data);
    const toastId = toast.loading("Updating Attendence");
    try {
        const res = await apiConnector("POST",UPDATE_ATTENDENCE, data);
        if (res.status === 200) {
        toast.success("Attendence Updated Successfully");
        navigate(-1);
        }
    } catch (err) {
        toast.error("Attendence Update Failed1111");
        return err;
    }
    finally{
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
    };

//show single student attendence

export const showSingleStudentAttendence =  (data) => {
    return async(dispatch)=>{
        dispatch(setLoading(true));
    const toastId = toast.loading("Loading Details");
    try {
        const res = await apiConnector("POST",SHOW_SINGLE_STUDENT_ATTENDENCE, data);
        if (res.status === 200) {
        toast.success("Details Loading successfully");
        return res.data;
        }
    } catch (err) {
     toast.error("Details Loading Failed");
        return err;
    }
    finally{
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
      
}
    }


    // show single student detials
    export const showSingleStudent=(data)=>{
  const toastId=toast.loading("loading");

      return async(dispatch)=>{
        try {
          console.log("data",data);
     dispatch(setLoading(true));
     const response=await apiConnector("POST",SHOW_SINGLE_STUDENT,data);
  console.log("response",response);
     if(response.status===200)
     return response.data;
    else{
      toast.error("Error while loading Details");
    }
        }catch(err){
toast.error("Error while loading Details");
console.log(err);
        }finally{
toast.dismiss(toastId);
dispatch(setLoading(false));
        }
      }

    }

    // update student detils

    export const updateStudentDetails=(data,navigate)=>{
      return async(dispatch)=>{
        const toastId=toast.loading("updating Detils");
      try{
dispatch(setLoading(true));

const response=await apiConnector("POST",UPDATE_STUDENT_DETAILS,data);

if(response.status===200){
toast.success("updated successfully");
navigate(-1);
}
      }
      catch(err){
 toast.error("error while updating");
 console.log(err);
      }finally{
      toast.dismiss(toastId);
      dispatch(setLoading(true));
      }};
    }
    