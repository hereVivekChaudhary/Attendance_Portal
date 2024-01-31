import  {authendpoints} from './apis';
import { toast } from "react-hot-toast";
import { setLoading, setToken, setUser } from '../reduxslice/authSlice';
import { apiConnector } from './apiConnector';

const {SEND_OTP,SIGNUP,LOGIN,CHANGE_PASSWORD,FORGOT_PASSWORD,RESET_PASSWORD }=authendpoints;

export function sendOtp(email,navigate){
    return async(dispatch)=>{   
        const toastId=toast.loading("Sending OTP");
        dispatch(setLoading(true));
      
        try{
            const   response=await apiConnector("POST",SEND_OTP,{email:email});
       
            if(response.status===200){
                toast.success("OTP sent successfully");
                navigate('/verify-otp');
            }
            else{
                toast.error("Something went wrong");
            }
            dispatch(setLoading(false));
            toast.dismiss(toastId);

        }catch(error){
            console.log(error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function signup(data,navigate){
    return async(dispatch)=>{
       
        const toastId=toast.loading("Signing up");
        dispatch(setLoading(true));
   
        try {
            const response=await apiConnector("POST",SIGNUP,data);
         
            if(response.status===200){
                toast.success("Signup successful");
                navigate('/user/login');
            }
            else{
                toast.error("Something went wrong");
            }

        }catch(error){
            toast.error('signup failed');
            navigate('/user/signup');
console.log(error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(data,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Logging in");
        try{
            
            dispatch(setLoading(true));
            const response=await apiConnector("POST",LOGIN,data);
            if(response.status===200){
                dispatch(setToken(response.data.token));
                dispatch(setUser(response.data.result));
                localStorage.setItem("token", JSON.stringify(response.data.token))
                localStorage.setItem("user", JSON.stringify(response.data.result))
                toast.success("Login successful");
                navigate('/');
            }
           
                toast.error("Something went wrong");
          
        }catch(error){
            toast.error("Something went wrong");
            console.log(error);
        }
        finally{
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
       
    }
    

}

export function Logout(navigate) {
  
    return async (dispatch) => {
        
      
  
       dispatch(setToken(null));
       dispatch(setUser(null));
  
      localStorage.removeItem("token");
      localStorage.removeItem("user");
  
    
      navigate('/user/login');
      toast.success("Logout successful");
    };
  }
  
  

// generate password reset token
 export function forgotPassword(data){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
        const response=await apiConnector("POST",FORGOT_PASSWORD,data);
        if(response.status===200){
            toast.success("Password reset link sent successfully");
        }
        else{
            toast.error("Something went wrong");
        }}
        catch(error){
            console.log(error);
        }
        dispatch(setLoading(false));
    }
 }

 // reset password

 export function resetPassword(data,navigate)
 {
    
    return async(dispatch)=>{
        console.log(data);
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",RESET_PASSWORD,data);
            if(response.status===200){
                toast.success("Password reset successfully");
            }
            else{
                toast.error("Something went wrong");
            }
            navigate('/user/login');
        }catch(error){
            console.log(error);
        }   
        dispatch(setLoading(false));
    }
 }
//change password

export function changePassword(data){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",CHANGE_PASSWORD,data);
            if(response.status===200){
                toast.success("Password changed successfully");
            }
            else{
                toast.error("Something went wrong");
            }

        }catch(error){
            console.log(error);
        }
        dispatch(setLoading(false));
    }
}