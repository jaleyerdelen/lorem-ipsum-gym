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
      .get(`${process.env.REACT_APP_API_URL}/courses/client`)
      .then((res) => setCourses(res.data.course))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="row main-card d-flex  mt-5">
        {courses.map((course) => {
          console.log("course", course);
          return (
            <div className="col-4 card d-flex" styleName="width: 18rem;">
              <img
                src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/03/19/18/idoh-exercise.jpg?width=1200"
                className=""
                alt="..."
                width="400"
              />
              <div
                className="card text-dark bg-light mb-3"
                styleName="max-width: 18rem;"
              >
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text">{course.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientPage;
