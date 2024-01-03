import "./App.css";
import Home from "./Home"
import { Route, Routes } from "react-router-dom/dist";
import CreateClass from "./CreateClass";
import AddStudent from "./AddStudent";
import FormType from "./Formtype";
import VerifyEmail from "./VerifyOtp";
import Navbar from "./Navbar";
import ChangePassword from "./changePassord/ChangePassword";
import ForgotPassword from "./changePassord/ForgotPassword";

function App() {




  return (
   
    <div className="bg-black h-screen w-screen ">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addclass" element={<CreateClass />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="user/:formtype" element={<FormType />} />
        <Route path="/verify-otp" element={<VerifyEmail />} />
        <Route path="/forogotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={< ChangePassword/>} />
        <Route path="*" element={<h1 className=" bg-white">404 not found</h1>} />
      </Routes>
    </div>
  );
  
}

export default App;
