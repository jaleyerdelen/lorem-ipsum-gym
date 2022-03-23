import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Category from "./components/Category";
import Register from "./components/Register";
import Login from "./components/Login";

import CourseDetail from "./pages_detail/CourseDetail"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
