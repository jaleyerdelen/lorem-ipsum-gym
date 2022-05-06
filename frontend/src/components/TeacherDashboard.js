import axios from "axios";
import React, { useState } from "react";
import cookie from "react-cookies";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Open modal for @mdo
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Create Course
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit} h method="POST">
                <div class="mb-3">
                  <label for="name" class="col-form-label">
                    Name
                  </label>

                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    class="form-control"
                  />
                </div>

                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Description
                  </label>
                  <textarea
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    class="form-control"
                    id="message-text"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => dashboard()}
                type="submit"
                class="btn btn-primary"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TeacherDashboard;
