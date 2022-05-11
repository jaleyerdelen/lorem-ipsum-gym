import axios from "axios";
import React, { useEffect, useState } from "react";
import cookie from "react-cookies";

const AdminPage = () => {
  const [admin, setAdmin] = useState([""]);

  useEffect(() => {
    const adminPage = () => {
      const token = cookie.load("token");
      axios
        .get("http://localhost:5000/users", {
          headers: { authorization: `Baerer ${token}` },
        })
        .then((res) => setAdmin(res.data.user))
        .catch((err) => console.log(err));
    };
    adminPage();
  }, []);

  const deleteUser = (admins)=> {
      const token = cookie.load("token");
    axios
      .delete(`http://localhost:5000/users/${admins._id}`, {
          headers: { authorization: `Baerer ${token}` },
        })
        .then((res)=> console.log(res.data))
        .catch((err)=> console.log(err))
  }

  return (
    <div>
      {admin.map((admins) => {
        return (
          <>
            <h1>{admins.name}</h1>
             <button
                onClick={() =>deleteUser(admins)}
                type="button"
                className="btn btn-primary"
              >
                delete
              </button>
          </>
        );
      })}
    </div>
  );
};

export default AdminPage;
