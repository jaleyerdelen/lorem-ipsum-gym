import axios from "axios";
import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"

const Edit = () => {
  const { slug } = useParams();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getCourse = () => {
      const token = cookie.load("token");
      axios
        .get(` http://localhost:5000/courses/${slug}`, {
          headers: { authorization: `Baerer ${token}` },
        })
        .then((res) => {
          setName(res.data.course.name);
          setDescription(res.data.course.description);
        })
        .catch((err) => console.log(err));
    };

    getCourse();
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateCourse();
  };

  const updateCourse = () => {
    const token = cookie.load("token");
    axios.put(
      ` http://localhost:5000/courses/${slug}`,
      {
        name: name,
        description: description,
      },
      {
        headers: { authorization: `Baerer ${token}` },
      }
    );
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit} method="PUT">
      <div className="mb-3">
        <label for="name" className="col-form-label">
          Name
        </label>

        <input
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label for="message-text" className="col-form-label">
          Description
        </label>
        <textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="form-control"
          id="message-text"
        ></textarea>
        <Link to="/">
        <button
          type="button"
          onClick={() => updateCourse()}
          className="btn btn-primary"
        >
          Edit
        </button>
        </Link>
      </div>
    </form>
    </div>
  );
};

export default Edit;
