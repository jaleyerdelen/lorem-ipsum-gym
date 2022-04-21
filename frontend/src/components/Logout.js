import axios from "axios";
import React from "react";
import cookie from 'react-cookies'

const Logout = () => {
  const log = () => {
    console.log("buttona tıklandı");
    axios
      .get("http://localhost:5000/auth/logout")
       .then((res) => console.log("logout", res))
      .then((res) => cookie.remove("token"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button onClick={() => log()}>Logout</button>;
    </div>
  );
};

export default Logout;
