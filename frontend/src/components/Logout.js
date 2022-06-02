import axios from "axios";
import React from "react";
import cookie from "react-cookies";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const navigate = useNavigate();

  const noti = () => {
    toast.success("success logout", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  useEffect(() => {
    log();
  }, []);

  const log = () => {
    console.log("buttona tıklandı");
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        noti();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .then((res) => cookie.remove("token"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Logout;
