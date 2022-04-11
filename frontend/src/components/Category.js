import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const Category = () => {
  const [category, setCategory] = useState([""]);

  const axe = () => {
    const token = cookie.load("token");
    console.log(token);
    axios
      .get("http://localhost:5000/category", {
        headers: { authorization: `Baerer ${token}` },
      })
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
