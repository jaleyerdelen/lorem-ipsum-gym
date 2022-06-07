import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [isLoggin, setIsLogin] = useState(false);
  const [profil, setProfil] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategory();
    profile();
  }, []);

  const getCategory = () => {
    const token = cookie.load("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/category`, {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => setCategory(res.data.category))
      .catch((error) => {
        setTimeout(() => {
          alert("you can't enter");
          navigate("/");
        }, 2000);
      });
  };

  const profile = () => {
    const token = cookie.load("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/profile`, {
        headers: { authorization: `Baerer ${token}` },
      })
      .then((res) => {
        console.log(res.data.profile.role);
        if (res.data.profile.role.includes("student")) {
          setProfil(false);
          alert("you are a student");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else if (res.data.profile.role.includes("teacher")) {
          setProfil(true);
          console.log("you are a teacher");
        } else {
          console.log("who are you");
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteCategory = (categor) => {
    const token = cookie.load("token");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/category/${categor._id}`, {
        headers: { authorization: `Baerer ${token}` },
      })
       .then(() => getCategory())
      .catch((error) => console.log(error));
  };

  return (
    <>
      {profil === true ? (
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
              <div key={categor} className="category-box col-4 mb-5">
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
      ) : (
        false
      )}
    </>
  );
};

export default Category;
