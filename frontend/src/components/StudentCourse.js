import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const StudentCourse = () => {
  const [courses, setCourses] = useState([""]);
  const [enroll, setEnroll] = useState([""]);

  useEffect(() => {
    allCourse();
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
      .then((res) => console.log("res", res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {courses.map((course) => {
        console.log("courses", course);
        return (
          <div>
            <h4>{course.name}</h4>
            <h3>{course.description}</h3>
            {/* <Link to="/studentDashboard">  */}
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
            <div></div>
            {/* </Link>  */}
          </div>
        );
      })}
    </div>
  );
};

export default StudentCourse;
