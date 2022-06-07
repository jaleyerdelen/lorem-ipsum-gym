import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cookie from "react-cookies";

const CategoryDetail = () => {
  const [categor, setCategor] = useState([""]);
  const { slug } = useParams();

  useEffect(() => {
    const allCategor = () => {
      const token = cookie.load("token");
    console.log("fed",token);
      axios
        .get(`${process.env.REACT_APP_API_URL}/category/${slug}`, {
        headers: { authorization: `Baerer ${token}` },
      })
        .then((res) => setCategor(res.data.category))
        .catch((err) => console.log(err));
    };

    allCategor();
  }, [slug]);

  return <div>{categor.name}</div>;
};

export default CategoryDetail;
