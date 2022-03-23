import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const [course, setCourse] = useState([""]);
  const { id } = useParams();

  useEffect(() => {
    const allCourse = () => {
      axios
        .get(`http://localhost:5000/courses/${id}`)
        .then((res) => setCourse(res.data.course))
        .catch((err) => console.log(err));
    };

    allCourse();
  }, [id]);
  return <div>{course.name}</div>;
};

export default CourseDetail;
