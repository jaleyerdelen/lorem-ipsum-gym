import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [register, setRegister] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  const signup = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/users`,
      data: {
        name: name,
        email: email,
        password: password,
        role: role,
      },
    })
      .then((res) => {
        setRegister(res.data.user);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="mb-3 row">
        <label for="staticText" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-4">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            readonly
            className="form-control"
            id="staticText"
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
            value={email}
            className="form-control"
            id="staticEmail"
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Role</label>
        <div className="col-sm-4">
          <select
            onChange={(e) => {
              setRole(e.target.value);
            }}
            name="role"
            className="form-control"
          >
            <option>student</option>
            <option>teacher</option>
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label for="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-4">
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="current-password"
            value={password}
            name="password"
            id="password"
            className="form-control"
          />
        </div>
      </div>
      <Link to="/">
      <input className="btn btn-primary" type="submit" value="Submit" />
    </Link>
    </form>
    </div>
  );
};

export default Register;
