import axios from "axios";
import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  
  const [courses, setCourses] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profil, setProfil] = useState(false);

  useEffect(() => {
    profile()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dashboard();
  };

  const dashboard = () => {
    const token = cookie.load("token");
    axios
      .post(
        "http://localhost:5000/courses/",
        {
          name: name,
          description: description,
        },
        {
          headers: { authorization: `Baerer ${token}` },
        }
      )
      .then((res) => setCourses(res.data.course));
  };

  const profile = () => {
    const token = cookie.load("token");
    axios
      .get(" http://localhost:5000/users/profile", {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => {
        console.log(res.data.profile.role);
        if (res.data.profile.role.includes("student")) {
          setProfil(false);
          console.log("you are a student");
        } else if (res.data.profile.role.includes("teacher")) {
          setProfil(true);
          console.log("you are a teacher");
        } else {
          console.log("who are you");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {profil === true ? (
        <>
          <div
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Create Course
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit} h method="POST">
                    <div className="mb-3">
                      <label for="name" className="col-form-label">
                        Name
                      </label>

                      <input
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label for="message-text" className="col-form-label">
                        Description
                      </label>
                      <textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className="form-control"
                        id="message-text"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <Link to="/home">
                    <button
                      onClick={() => dashboard()}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Send
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
       ) : (
        false
      )} 
    </>
  );
};
export default TeacherDashboard;
