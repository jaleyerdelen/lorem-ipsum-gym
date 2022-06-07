import axios from "axios";
import React, { useEffect, useState } from "react";

const Programs = () => {
  const [category, setCategory] = useState([""]);

  useEffect(() => {
    allCourse();
  }, []);

  const allCourse = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/category/program`)
      .then((res) => setCategory(res.data.category))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="row main-card d-flex  mt-5">
        {category.map((categor) => {
          console.log("categor", categor);
          return (
            <div className="col-4 card d-flex" styleName="width: 18rem;">
              <img
                src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                className=""
                alt="..."
                width="400"
              />
              <div
                className="card text-dark bg-light mb-3"
                styleName="max-width: 18rem;"
              >
                <div className="card-body">
                  <h5 className="card-title">{categor.name}</h5>
                  <p className="card-text">{categor.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Programs;
