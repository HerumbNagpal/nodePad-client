import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewTodo(props) {
  const auth = JSON.parse(sessionStorage.getItem("user"));
  const email = auth.data.data.email;

  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const handleInp = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = async () => {
    
    const userData = {
      email: email,
      task: task,
      completed: false,
    };
    const result = await axios.post(
      "http://localhost:3001/todos/add",
      userData
    );
    
    // console.log(result)
    if(result.data.statusCode === 201 ){
        navigate("/todos/redirectToTodos")
    }

  };
  return (
    <div className="newTodo">
      {/* NewNote */}
      <div className="todoOverlay" onClick={props.closeModal}></div>
      <div className="newTodo-content">
        <textarea
          type="text"
          className="newTodo-task"
          id="task"
          value={task}
          onChange={handleInp}
          placeholder="Task....."
        />
        <div className="btnnn">
          <button
            className="add-btn"
            disabled={task.length === 0 ? true : false}
            style={{
              backgroundColor: task.length === 0 ? "grey" : "",
              cursor: task.length === 0 ? "not-allowed" : "",
            }}
            onClick={handleAddTask}
          >
            ADD
          </button>
          <button className="close-btn" onClick={props.closeModal}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
