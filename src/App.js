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
import Openroute from "./Routes/Openroute";
import Privateroute from "./Routes/Privateroute";
import Menu from "./Menu";
import Sheet from "./Sheet";

function App() {
  return (
   
    <div className="bg-black h-screen w-screen ">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Privateroute><Home/></Privateroute>} />
        <Route path="/addclass" element={<Privateroute><CreateClass /></Privateroute>} />
        <Route path="/AddStudent/:id" element={<Privateroute><AddStudent /></Privateroute>} />
        <Route path="/menu/:id" element={<Privateroute><Menu/></Privateroute>} />
        <Route path="user/:formtype" element={<Openroute><FormType /></Openroute>} />
        <Route path="/verify-otp" element={<Openroute><VerifyEmail /></Openroute>} />
        <Route path="/forogotPassword" element={<Openroute><ForgotPassword /></Openroute>} />
        <Route path="/resetPassword/:token" element={<Openroute>< ChangePassword/></Openroute>} />
        <Route path="/markAttendence/:id" element={<Privateroute><Sheet/></Privateroute>} />
        <Route path="/updateAttendence/sheet/:id" element={<Privateroute><Sheet/></Privateroute>} />
        <Route path="*" element={<h1 className=" bg-white">404 not found</h1>} />
      </Routes>
    </div>
  );
  
}

export default App;
