import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const StudentDashboard = () => {
  const [student, setStudent] = useState([""]);

  const profile = () => {
    const token = cookie.load("token");
    axios
      .get(" http://localhost:5000/users/profile", {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => setStudent(res.data.profile.courses))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    profile();
  }, []);
  return (
    <div>
      {student.map((i) => {
        console.log("i", i);
        return <div>{i.name}</div>;
      })}
    </div>
  );
};

export default StudentDashboard;
