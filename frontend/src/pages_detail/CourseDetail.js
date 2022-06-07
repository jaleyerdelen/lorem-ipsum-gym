import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cookie from "react-cookies";

const CourseDetail = () => {
  const [course, setCourse] = useState([""]);
  const { slug } = useParams();

  useEffect(() => {
    const allCourse = () => {
       const token = cookie.load("token");
      axios
        .get(`${process.env.REACT_APP_API_URL}/courses/${slug}`, {
        headers: { authorization: `Baerer ${token}` },
      })
        .then((res) => setCourse(res.data.course))
        .catch((err) => console.log(err));
    };

    allCourse();
  }, [slug]);
  return <div>{course.name}</div>;
};

export default CourseDetail;
