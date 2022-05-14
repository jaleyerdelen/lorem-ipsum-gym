import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const Category = () => {
  const [category, setCategory] = useState([""]);
  const [isLoggin, setIsLogin] = useState(false);

  useEffect(() => {
    axe();
  }, [category]);

  const axe = () => {
    const token = cookie.load("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    axios
      .get("http://localhost:5000/category", {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => setCategory(res.data.category))
      .catch((error) => console.log(error));
  };

  const deleteCategory = (categor) => {
    const token = cookie.load("token");
    axios
      .delete(`http://localhost:5000/category/${categor._id}`, {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {category.map((categor) => {
        return (
          <div>
            <Link to={`/category/${categor.slug}`}>
              <h1>{categor.name}</h1>
            </Link>
            {isLoggin === true && (
              <button
                onClick={() => deleteCategory(categor)}
                type="button"
                className="btn btn-primary"
              >
                delete
              </button>
            )}
          </div>
        );
      })}

      <div className="m-4">
        <Link to="/categoryEdit">
          <button type="button" className="btn btn-primary">
            Create New Category
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Category;
