import "./App.css";
import Home from "./Home"
import { Route, Router, Routes } from "react-router-dom/dist";
import CreateClass from "./CreateClass";
import AddStudent from "./AddStudent";
import FormType from "./Formtype";

function App() {




  return (
//  all classes and create classess

<div className=" bg-black h-screen">

<Routes>

  <Route path="/" element={<Home/>}/>
  <Route path="/addclass" element={<CreateClass/>}/> 
  <Route path="/AddStudent" element={<AddStudent/>}/>
  <Route path="user/:formtype" element={<FormType/>}/>
</Routes>

</div>
  );
}

export default App;
