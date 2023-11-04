import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodoLists from "./TodoLists";
import NewTodo from "./NewTodo";
export default function Todos() {
  const [isLoading, setIsLoading] = useState(true);
  const [showNewTodoModal, setShowNewTodoModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedAni, setCompletedAni] = useState(false);
  const [showTodoModal,setShowTodoModal] = useState(false);

  const auth = JSON.parse(sessionStorage.getItem("user"));
  const email = auth ? auth.data.data.email : null;

  const fetchTodos = async () => {
    const userData = {
      email: email,
    };
    const result = await axios.post(
      "http://localhost:3001/todos/findAll",
      userData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    // console.log(result.data.data)
    setTodos(result.data.data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchTodos();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleCompletedAnimation = () => {
    // console.log("animation started");
    setCompletedAni(true);
    fetchTodos();
    setTimeout(() => {
      // console.log("animation ended");
      setCompletedAni(false);
    }, 1000);
  };
  const closeModal = () => {
    setShowNewTodoModal(false);
  }
  const handleAddTask = () => {};
  const handleShowInp = () => {
    setShowNewTodoModal(!showNewTodoModal);
  };
  const handleHome = () => {
    navigate("/");
  };
  if (todos.length > 0) {
    todos.sort((a, b) => a.completed - b.completed);
    // console.log("sorted");
    // console.log(todos);
  } else {
    console.log("no data");
  }
  return (
    <div
      className="todos"
      style={{ backgroundColor: isLoading ? "#8acdeb" : "#f6f2f1" }}
    >
      {/* <>.</> */}
      {isLoading && <Loader />}
      {completedAni && (
        <div className="completedTaskImg">
          <img src={require("../../images/taskDone1.gif")} alt="" />
        </div>
      )}
      {!isLoading && !completedAni && (
        <div>
          <p className="goHome" onClick={handleHome}>
            Home
          </p>

          <div className="tHeading">
            <h1>To Do List</h1>

            <span
              style={{ fontSize: "50px", cursor: "pointer" }}
              className="material-symbols-outlined"
              onClick={handleShowInp}
            >
              add_circle
            </span>
          </div>

          {/* show message if no tasks are there */}
          {todos.length === 0 && (
            <>
              <h1> Nothing to see here. Add new tasks..</h1>
              <div
                className="todo-examples"
                // style={{ top: showNewTodoModal ? "67%" : "" }}
              >
                <p>Example : </p>
                <div className="todo-scroller">
                  <span>
                    Feed Kibou <br />
                    Buy Groceries <br />
                    Go for a walk with Kibou <br />
                    Complete homework <br />
                    Watch Real Madrid match <br />
                  </span>
                </div>
              </div>
            </>
          )}

          {/* display the tasks */}
          {todos.length > 0 && (
            <div className="todos-listContainer">
              <TodoLists
                todos={todos}
                handleCompletedAnimation={handleCompletedAnimation}
              />

              {/* {todos.map((task,index)=>{
              return(
                <div key={index} >
                </div>
              )
            })} */}
            </div>
          )}
        </div>
      )}
       {showNewTodoModal && (
           <NewTodo closeModal = {closeModal} />
          )}
    </div>
  );
}
