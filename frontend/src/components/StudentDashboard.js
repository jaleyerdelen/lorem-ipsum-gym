import axios from "axios";
import React, { useEffect, useState } from "react";
import cookie from "react-cookies";

const StudentDashboard = () => {
  const [student, setStudent] = useState([""]);
  
  useEffect(() => {
    profile();
  }, []);

  const profile = () => {
    const token = cookie.load("token");
    axios
      .get(" http://localhost:5000/users/profile", {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => setStudent(res.data.profile.courses))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>Your Courses</p>
      {student.map((i) => {
        return (
          <>
            <div>{i.name}</div>
          </>
        );
      })}
    </div>
  );
};

export default StudentDashboard;
