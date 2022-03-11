import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Category from "./components/Category";

function Home() {
  axios
    .get("/http://localhost:5000/courses")
    .then((res) => {
      console.log(res.data.courses);
    })
    .catch((error) => {
      console.log(error);
    });
  return <h2>hello</h2>;
}

function App() {
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res.data.message);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
