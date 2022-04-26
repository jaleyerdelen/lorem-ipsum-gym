import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import Home from "./components/Home";
import Category from "./components/Category";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import TeacherDashboard from "./components/TeacherDashboard";

import CourseDetail from "./pages_detail/CourseDetail"
import CategoryDetail from "./pages_detail/CategoryDetail";


function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login   />} />
        <Route path="/logout" element={<Logout  />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />

        <Route path="/category/:slug" element={<CategoryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
