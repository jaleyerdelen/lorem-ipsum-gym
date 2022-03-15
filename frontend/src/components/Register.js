import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  
  const [register, setRegister] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  const signup = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/users",
      data: {
        name: name,
        email: email,
        password: password,
      },
    })
      .then((res) => {
        setRegister(res.data.user);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <textarea
          onChange={(e) => {
            setName(e.target.value);
            setEmail(e.target.value);
            setPassword(e.target.value);
          }}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Register;
