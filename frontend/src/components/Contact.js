import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const contact = () => {
    axios
      .post("http://localhost:5000/auth/contact", {
        name: name,
        email: email,
        message: message,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label for="text" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-4">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              name="text"
              id="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="staticEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-4">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              readonly
              className="form-control"
              id="staticEmail"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="text" className="col-sm-2 col-form-label">
            Message
          </label>
          <div className="col-sm-4">
            <input
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              type="text"
              name="text"
              id="text"
              className="form-control"
            />
          </div>
        </div>
        <Link to="/">
        <input className="btn btn-primary" onClick={() => contact()} type="submit" value="Submit" />
        </Link>
      </form>
    </div>
  );
};

export default Contact;
