import axios from "axios";
import React, { useState } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

const CategoryEdit = () => {
  const [name, setName] = useState([""]);
  const [description, setDescription] = useState([""]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const createCategory = () => {
    const token = cookie.load("token");
    axios
      .post(
        "http://localhost:5000/category",
        {
          name: name,
          description: description,
        },
        {
          headers: { authorization: `Baerer ${token}` },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="text" className="form-label">
            Category Name
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="text"
          />
        </div>
        <div className="mb-3">
          <label for="text" className="form-label">
            Category Description
          </label>
          <input
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-control"
            id="text"
          />
        </div>
        <Link to="/category">
          <button
            onClick={() => createCategory()}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
};

export default CategoryEdit;
