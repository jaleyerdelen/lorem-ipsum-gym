import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const StudentCourse = () => {
  const [courses, setCourses] = useState([""]);
  const [course_id, setCourses_id] = useState([""]);

  const navigate = useNavigate();

  useEffect(() => {
    allCourse();
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
      .get("http://localhost:5000/courses/", {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => setCourses(res.data.courses))
      .catch((err) => console.log(err));
  };

  const enrollCourse = (course) => {
    console.log("tıklandı");
    const token = cookie.load("token");
    axios
      .post(
        " http://localhost:5000/courses/enroll",
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

  return (
    <div>
      {courses.map((course) => {
        console.log("courses", course);
        return (
          <div>
            <h4>{course.name}</h4>
            <h3>{course.description}</h3>
            <form method="POST">
              <input type="hidden" name="course" />
              <button
                onClick={() => enrollCourse(course)}
                type="button"
                className="btn btn-primary m-4"
              >
                Enroll
              </button>
            </form>
            <ToastContainer />
          </div>
        );
      })}
    </div>
  );
};

export default StudentCourse;