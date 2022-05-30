import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClientPage = () => {
  const [courses, setCourses] = useState([""]);

  useEffect(() => {
    allCourse();
  }, []);

      const allCourse = () => {
    axios
      .get("http://localhost:5000/courses/client")
      .then((res) => setCourses(res.data.course))
      .catch((err) => console.log(err));
  };
    return(
        <div>
            {
                courses.map((course)=> {
                    console.log("course", course)
                    return(
                        <h2>{course.name}</h2>
                    )
                })
            }
        </div>
    )
}

export default ClientPage