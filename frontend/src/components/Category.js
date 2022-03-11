import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = () => {
  const [category, setCategory] = useState([""]);

  const axe = () => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => {
        setCategory(res.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axe();
  }, []);

  return (
    <div>
      <h2>jale</h2>
      {category.map((cat) => (
        <div>
          <h1>{cat.name}</h1>
          <h2>{cat.description}</h2>
        </div>
      ))}
    </div>
  );
};

export default Category;
