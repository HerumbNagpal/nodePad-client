import React, { useState } from "react";
import "../styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Todo(props) {
  const auth = JSON.parse(sessionStorage.getItem("user"));
  const email = auth ? auth.data.data.email : null;
  const navigate = useNavigate();

  const handleDelTask = async () => {
    const userDate = {
      email: email,
      _id: props._id,
    };

    const result = await axios.post(
      "http://localhost:3001/todos/del",
      userDate
    );
    if (result.data.statusCode === 200) {
      props.handleCompletedAnimation();
      // handleCompletedAnimation();
    }
  };

  const handleCompleteTask = async () => {
    const userData = {
      email: email,
      _id: props._id,
    };
    const result = await axios.post(
      "http://localhost:3001/todos/completed",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result.data.statusCode === 200) {
      props.handleCompletedAnimation();
      // handleCompletedAnimation();
    }
  };
  return (
    <div className="task-container">
      <div className="checkBox">
        {props.completed ? (
          <span
            className="material-symbols-outlined"
            style={{ color: "grey", cursor: "not-allowed" }}
          >
            select_check_box
          </span>
        ) : (
          <span
            className="material-symbols-outlined"
            style={{ cursor: "pointer" }}
            onClick={handleCompleteTask}
          >
            check_box_outline_blank
          </span>
        )}
      </div>
      <h2
        className="taskDetails"
        style={{
          textDecoration: props.completed ? "line-through 3px black" : "",
          // color: props.completed ? "grey" : "",
        }}
      >
        {props.task}
      </h2>
      <div className="delTask" onClick={handleDelTask}>
        <span
          style={{ color: props.completed ? "grey" : "red" }}
          className="material-symbols-outlined"
        >
          delete
        </span>
      </div>
    </div>
  );
}
