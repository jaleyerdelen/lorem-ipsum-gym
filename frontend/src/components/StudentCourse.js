import axios from "axios";
import React, { useEffect, useState } from "react";
import cookie from "react-cookies";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const StudentCourse = () => {
  const [courses, setCourses] = useState([""]);
  const [course_id, setCourses_id] = useState([""]);
  const [profil, setProfil] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    allCourse();
    profiles();
  }, []);

  const notify = () => {
    toast.error("you have already this course", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  const noti = () => {
    toast.success("you are enrolled", {
      position: "top-center",
      autoClose: 1000,
    });
  };
  const allCourse = () => {
    const token = cookie.load("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/courses`, {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => setCourses(res.data.courses))
      .catch((err) => console.log(err));
  };

  const enrollCourse = (course) => {
    const token = cookie.load("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/courses/enroll`,
        {
          course_id: course._id,
        },
        {
          headers: { authorization: `Baerer ${token}` },
        }
      )
      .then((res) => {
        setCourses_id(res.data.user.name);
        noti();
        setTimeout(() => {
          navigate("/studentDashboard");
        }, 3000);
      })

      .catch((err) => notify(err.request.status));
  };

  const releaseCourse = (course) => {
    const token = cookie.load("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/courses/release`,
        {
          course_id: course._id,
        },
        {
          headers: { authorization: `Baerer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("Are you sure you want to release the course ?");
        setTimeout(() => {
          navigate("/studentDashboard");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  const profiles = () => {
    const token = cookie.load("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/profile`, {
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
      {profil === false ? (
        <div className="student-course">
          <div className="container">
            <div className="row">
              {courses.map((course) => {
                return (
                  <div className="col-4 mb-5">
                    <h4>{course.name}</h4>
                    <p>{course.description}</p>
                    <form method="POST">
                      <input type="hidden" name="course" />
                      <button
                        onClick={() => enrollCourse(course)}
                        type="button"
                        className="btn btn-primary m-4"
                      >
                        Enroll
                      </button>
                      <button
                        onClick={() => releaseCourse(course)}
                        type="button"
                        className="btn btn-primary m-4"
                      >
                        Release
                      </button>
                    </form>
                    <ToastContainer />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        true
      )}
    </>
  );
};

export default StudentCourse;
