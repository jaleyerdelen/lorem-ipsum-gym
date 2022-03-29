import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const [categor, setCategor] = useState([""]);
  const { id } = useParams();

  useEffect(() => {
    const allCategor = () => {
      axios
        .get(`http://localhost:5000/category/${id}`)
        .then((res) => setCategor(res.data.category))
        .catch((err) => console.log(err));
    };

    allCategor();
  }, [id]);

  return <div>{categor.name}</div>;
};

export default CategoryDetail;
