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
    <div className="dashboard container">
      <div class="row row-cols-1 row-cols-md-8 g-4">
        {student.map((i) => {
          return (
            <>
              <div class="col-4 mb-5">
                <div class="card h-100">
                  <img
                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=775&q=80"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">{i.name}</h5>
                    <p class="card-text">{i.description}</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">created by {i.createdBy}</small>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default StudentDashboard;
