import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Category from "./components/Category";
import Register from "./components/Register"

function Home() {
  return <h2>jale's page</h2>;
}

function App() {
  const [courses, setCourses] = useState([""]);

  useEffect(() => {
    const allCourse = () => {
      axios
        .get("http://localhost:5000/courses")
        .then((res) => setCourses(res.data.courses))
        .catch((err) => console.log(err));
    };

    allCourse();
  }, []);

  return (
    <>
      <div>
        {courses.map((course) => (
          <div>
            {course.name}
            <h2>{course.description}</h2>
          </div>
        ))}
      </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
