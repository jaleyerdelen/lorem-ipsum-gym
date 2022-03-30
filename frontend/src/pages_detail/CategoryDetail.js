import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const [categor, setCategor] = useState([""]);
  const { slug } = useParams();

  useEffect(() => {
    const allCategor = () => {
      axios
        .get(`http://localhost:5000/category/${slug}`)
        .then((res) => setCategor(res.data.category))
        .catch((err) => console.log(err));
    };

    allCategor();
  }, [slug]);

  return <div>{categor.name}</div>;
};

export default CategoryDetail;
