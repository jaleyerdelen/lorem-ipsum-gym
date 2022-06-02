import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Lorem Ipsum Gym
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
             <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/program"
              >
                Programs
              </Link>
            </li>
             {/* Teacher Dashboard */}
            <li className="nav-item dropdown">
              <li
                className="nav-link dropdown-toggle"
                to="/dashboard"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Teacher Dashboard
              </li>

              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/category">
                    Create Category
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dashboard">
                    Create Course
                  </Link>
                </li>
                 <li>
                  <Link className="dropdown-item" to="/home">
                     Courses
                  </Link>
                </li>
              </ul>
            </li>
            {/* Student Dashboard */}
               <li className="nav-item dropdown">
              <li
                className="nav-link dropdown-toggle"
                to="/dashboard"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Student Dashboard
              </li>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/studentDashboard">
                    Your Courses
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/student">
                    Enroll Course
                  </Link>
                </li>
              </ul>
            </li>
               <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/contact"
              >
               Contact
              </Link>
            </li>
          </ul>
          <div className="navbar-text d-grid gap-2 d-md-flex justify-content-md-end ">
            <Link to="/register">
              <button type="button" className="btn btn-outline-warning me-md-2">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button type="button" className="btn btn-outline-info me-md-2">
                Login
              </button>
            </Link>
            <Link to="/logout">
              <button type="button" className="btn btn-outline-danger me-md-2">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
