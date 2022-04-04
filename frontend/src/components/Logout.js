import axios from "axios";
import React, { useState } from "react";

const Logout = () => {
  const [logout, setLogout] = useState([""]);

  const log = () => {
    console.log("buttona tıklandı");
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => console.log("logout",res))
      .catch((err) => console.log(err));
  };

  return <button onClick={()=>log()}>Logout</button>;
};

export default Logout;
