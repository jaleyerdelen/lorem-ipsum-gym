import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Category from "./components/Category";

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

  const Cat = () => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => {
        console.log(res.data.courses);
      })
      .catch((error) => {
        console.log(error);
      });
    return <h2>hello</h2>;
  };

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
          <Route
            path="category"
            element={<Category name="world" Cat={Cat} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
