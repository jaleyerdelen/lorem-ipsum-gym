import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const Home = () => {
  const [courses, setCourses] = useState([""]);
   const [profil, setProfil] = useState(false);

  useEffect(() => {
    allCourse();
    profile()
  }, []);

  const allCourse = () => {
    const token = cookie.load("token");
    axios
      .get("http://localhost:5000/courses/", {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => setCourses(res.data.courses))
      .catch((err) => console.log(err));
  };

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

   const profile = () => {
    const token = cookie.load("token");
    axios
      .get(" http://localhost:5000/users/profile", {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => {
        console.log(res.data.profile.role);
        if (res.data.profile.role.includes("student")) {
          setProfil(false);
          console.log("you are a student");
        } else if (res.data.profile.role.includes("teacher")) {
          setProfil(true);
          console.log("you are a teacher");
        } else {
          console.log("who are you");
        }
      })
      .catch((err) => alert("you can't enter"));
  };

  return (
    <>
     {profil === true ? (
      <div className="container d-flex main-course row">
        {courses.map((course) => {
          return (
            <div className="col-4">
              <div className="">
              {/* <Link to={`/courses/${course.slug}`}> */}
                <h2>{course.name}</h2>
                <p>{course.description}</p>
              {/* </Link>  */}
              <p className="fw-light">this course created by <b>{course.createdBy}</b></p>
              <Link to={`edit/${course.slug}`}>
                <button type="button" className="btn btn-warning">
                  update
                </button>
              </Link>
              <button
                onClick={() => deleteCourse(course)}
                type="button"
                className="btn btn-danger m-4"
              >
                delete
              </button>
              </div>
            </div>
          );
        })}
      </div>
       ) : (
        false
      )} 
    </>
  );
};

export default Home;
