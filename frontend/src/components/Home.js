import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const Home = () => {
  const [courses, setCourses] = useState([""]);

  useEffect(() => {
    const allCourse = () => {
      const token = cookie.load("token");
      axios
        .get("http://localhost:5000/courses/", {
          headers: { authorization: `Baerer ${token}` },
        })
        .then((res) => setCourses(res.data.courses))
        .catch((err) => console.log(err));
    };
    allCourse();
  }, []);

  
  const deleteCourse = (course) => {
    console.log("delete course tıklandı");
    const token = cookie.load("token");
    axios
      .delete(
        ` http://localhost:5000/courses/${course.slug}`,

        {
          headers: { authorization: `Baerer ${token}` },
        }
      )
      .then((res) => console.log(res.data));
  };

 
  

  return (
    <>
      <div>
        {courses.map((course) => {
          return (
            <div>
              <Link to={`courses/${course.slug}`}>
                <h2>{course.name}</h2>
              </Link>
              <Link to={`edit/${course.slug}`}>
                <button type="button" className="btn btn-primary">
                  update
                </button>
              </Link>
              <button
                onClick={() => deleteCourse(course)}
                type="button"
                className="btn btn-primary m-4"
              >
                delete
              </button>

            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
