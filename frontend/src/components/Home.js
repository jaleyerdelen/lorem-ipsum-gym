import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([""]);
  useEffect(() => {
    const allCourse = () => {
      axios
        .get("http://localhost:5000/courses/")
        .then((res) => setCourses(res.data.courses))
        .catch((err) => console.log(err));
    };

    allCourse();
  }, []);
  return (
    <>
      <div>
        {courses.map((course) => {
          return (
            <div>
              <Link to={`courses/${course._id}`}>
                <h2>{course.name}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
