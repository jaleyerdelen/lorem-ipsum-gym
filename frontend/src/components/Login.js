import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [register, setRegister] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    log();
  };

  const log = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        email: email,
        password: password,
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
    <form onSubmit={handleSubmit}>
      <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
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
        <label for="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="current-password"
            name="password"
            id="password"
            className="form-control"
          />
        </div>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
