import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  const [register, setRegister] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    log();
  };

  const log = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/auth/login",
      data: {
        email: email,
        password: password,
      },
    })
     .then((res) => {
        console.log(res);
      })
      // .then((res) => {
      //   setRegister(res.data.user);
      // })
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
      {/* <Link to="/"> */}
      <input type="submit" value="Submit" />
      {/* </Link> */}
    </form>
  );
};

export default Login;
