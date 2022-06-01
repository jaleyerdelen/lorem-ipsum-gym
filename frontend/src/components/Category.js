import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const Category = () => {
  const [category, setCategory] = useState([""]);
  const [isLoggin, setIsLogin] = useState(false);

  useEffect(() => {
    axe();
  }, []);

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
      .catch((error) => alert("you can't enter"));
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
    <div className="card-category row d-flex justify-content-center">
      <div className="m-4 d-flex justify-content-center mb-5">
        {isLoggin === true && (
          <Link to="/categoryEdit">
            <button type="button" className="btn btn-info">
              Create New Category
            </button>
          </Link>
        )}
      </div>
      {category.map((categor) => {
        return (
          <div className="category-box col-4 mb-5">
            {/* <Link className="link" to={`/category/${categor.slug}`}> */}
              <h5>{categor.name}</h5>
              <p>{categor.description}</p>
            {/* </Link> */}
            {isLoggin === true && (
              <div>
                <button
                  onClick={() => deleteCategory(categor)}
                  type="button"
                  className="btn btn-danger"
                >
                  delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Category;
