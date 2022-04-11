import axios from "axios";
import React, { useState } from "react";

const Logout = ({token}) => {
 console.log(token)
  const log = () => {
    console.log("buttona tıklandı");
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => console.log("logout",res))
      .catch((err) => console.log(err));
  };



  return (
    <div>
        
    <button onClick={()=>log()}>Logout</button>;
    </div>
  
  )
   
};

export default Logout;
