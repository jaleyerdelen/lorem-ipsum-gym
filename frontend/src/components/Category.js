import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([""]);

  const axe = () => {
    axios
      .get("http://localhost:5000/category/")
      .then((res) => setCategory(res.data.category))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axe();
  }, []);

  return (
    <div>
      {category.map((categor) => {
        return (
          <div>
            <Link to={`/category/${categor.slug}`}>
              <h1>{categor.name}</h1>
              {/* <h2>{categor.description}</h2> */}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
