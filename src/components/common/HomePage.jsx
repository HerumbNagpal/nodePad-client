import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../styles.css";
import axios from "axios";
import Loader from "./Loader";

export default function HomePage() {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const auth = JSON.parse(sessionStorage.getItem("user"))
  const email = auth.data.data.email
  // console.log(email);

  const findUser = async () => {
    const result = await axios.post("http://localhost:3001/findUser", {
      email: email,
    });
    // console.log(result);
    setUserName(result.data);
  };
  useEffect(() => {
    findUser();
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  });

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const handleTodosPage = () => {
    navigate("/todos")
  };

  const handleNotesPage = () => {
    navigate("/notes");
  };

  return (
    <div
      className="home"
      style={{ backgroundColor: isLoading ? "#8acdeb" : "#f6f2f1" }}
    >
      {isLoading && <Loader />}

      {!isLoading && (
        <div>
          <>.</>

          <h1>WELCOME BACK HOMIE</h1>
          <div className="userLogOut">
            <p>Hi, {userName} </p>
            <span className="material-symbols-outlined" onClick={handleLogOut}>
              logout
            </span>
          </div>

          <div className="hContainer">
            <div className="home-container hNotes" onClick={handleNotesPage}>
              <h1 className="hHead">Notes </h1>
            </div>
            <div className="home-container hTodos" onClick={handleTodosPage}>
              <h1 className="hHead">To Do Lists</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
