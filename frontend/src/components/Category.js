import React from "react";

const Category = ({ name, Cat }) => {
  return (
    <div>
      <h2>jale</h2>
      <h1>{name}</h1>
      <button type="button" onClick={() => Cat()}>
        jale
      </button>
    </div>
  );
};

export default Category;
