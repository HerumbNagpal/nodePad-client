import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../common/Modal";
// const loginBG = "#FFF8C4"
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [exit, setExit] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showModal, setshowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem("user"));
    // console.log(auth.data.data.email)
    const token = auth ? auth.data.data.email : null;
    if (token) {
      navigate("/");
    }
  }, []);


  const handleInp = (e) => {
    const i = e.target.id;

    if (i === "email") {
      setEmail(e.target.value);
    } else {
      setpassword(e.target.value);
    }
  };

  const toggleshowModal = () => {
    setshowModal(false);
  };

  const handleSignUp = () => {
    setExit(true);
    setTimeout(() => {
      navigate("/signUp");
    }, 900);
  };
  const handleLogin = async () => {
    const userData = {
      email: email,
      password: password,
    };
    const result = await axios.post("http://localhost:3001/login", userData);
    // console.log(result.data.data.email);
    if (result.data.statusCode === 200) {
      sessionStorage.setItem("user", JSON.stringify(result));
      navigate("/", {
        state: {
          email: userData.email
        }
      });
    } else {
      setErrorText(result.data.message);
      setshowModal(true);
    }
  };
  return (
    <div className={exit ? "moveLeft" : "loginPage"}>
      {/* <div className={!exit ? "loginPage" : ''}> */}
      <div className="lsContent">
        <div className="welcomeContent">
          <h1 className="head">Login</h1>
          <p className="desc">Welcome back to WhatPad</p>
        </div>
        <div className="inps">
          <input
            type="text"
            value={email}
            id="email"
            onChange={handleInp}
            placeholder="herumbn@gmail.com"
            autoComplete="off"
          />
          <input
            type="password"
            value={password}
            id="password"
            onChange={handleInp}
            placeholder="********"
          />
        </div>
        <div className="lsBtns">
          <button
            className="mainBtn"
            onClick={handleLogin}
            disabled={email.length < 1 || password.length < 1}
            style={{ backgroundColor: email.length < 1 || password.length < 1 ? 'grey' : '' }}
          >
            LOG IN
          </button>

          <div>
            <p className="secondaryBtn">
              New here?{" "}
              <span
                onClick={handleSignUp}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Sign up
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal errorText={errorText} toggleshowModal={toggleshowModal} />
      )}
      {/* </div> */}
    </div>
  );
}
