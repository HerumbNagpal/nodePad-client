import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (i === "username") {
      setUsername(e.target.value);
    } else if (i === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const toggleshowModal = () => {
    setshowModal(false);
  };

  const handleSignUp = async () => {
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    const result = await axios.post("http://localhost:3001/signUp", userData);
    console.log(result.data);
    if (result.data.statusCode === 200) {
      sessionStorage.setItem("user", JSON.stringify(result));
      navigate("/", {
        state: {
          email: userData.email
        }
      })

    } else {
      setErrorText(result.data.message);
      setshowModal(true);
    }
  };
  const handleLogin = () => {
    setExit(true);
    setTimeout(() => {
      navigate("/login");
    }, 900);
  };

  return (
    <div className={exit ? "moveRight" : "signupPage"}>
      <div className="lsContent">
        <div className="welcomeContent">
          <h1 className="head">Sign Up</h1>
          <p className="desc">Join the WhatPad family</p>
        </div>
        <div className="inps">
          <input
            type="text"
            value={username}
            id="username"
            onChange={handleInp}
            placeholder="Herumb Nagpal"
            autoComplete="off"
          />
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
            onClick={handleSignUp}
            disabled={username.length < 1 || email.length < 1 || password.length < 1}
            style={{
              backgroundColor:
                username.length < 1 || email.length < 1 || password.length < 1 ? "grey" : "",
            }}
          >
            Sign up
          </button>
          <div>
            <p className="secondaryBtn">
              Already a user?{" "}
              <span
                onClick={handleLogin}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Log in
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal errorText={errorText} toggleshowModal={toggleshowModal} />
      )}
    </div>
  );
}
