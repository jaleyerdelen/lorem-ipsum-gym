import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const Home = () => {


  const [courses, setCourses] = useState([""]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // const updateCourse = () => {
     
  // const token = cookie.load("token");
  // axios.put(
  //    "http://localhost:5000/courses/",
  //      {
  //           name: name,
  //           description: description,
  //         },
  //         {
  //           headers: { authorization: `Baerer ${token}` },
  //         }
  // )
  // .then((res) => console.log(res.data));
  //   }

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
  return (
    <>
      <div>
        {courses.map((course) => {
          return (
            <div>
              <Link  to={`courses/${course.slug}`}>
                <h2>{course.name}</h2>
              </Link>
              <Link to={`edit/${course.slug}`}> 
              <button  type="button" className="btn btn-primary">update</button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
