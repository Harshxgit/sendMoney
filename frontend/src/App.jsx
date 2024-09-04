import { useState } from "react";

import "./App.css";
import {BrowserRouter ,Routes, Route } from "react-router-dom";
import {Signup} from "./pages/Signup";
import { DashBoard } from "./pages/dashboard";
import { SendMoney } from "./pages/SendMoney";
function App() {
  return (
    <>
        {/* routing */}
     <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
       {/* <Route path="/signin" element={<Signin/>}/>*/}
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/send" element={<SendMoney/>}/>  
      </Routes>
     </BrowserRouter> 
    </>
  );
}

export default App;
