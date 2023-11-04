import React from "react";
import Todo from "./Todo";
import "../styles.css";
export default function TodoLists(props) {
  const todos = props.todos;
  // console.log(todos);
  return (
    <div className="todo-list">
      
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <Todo
                task={todo.task}
                completed={todo.completed}
                _id={todo._id}
                handleCompletedAnimation = {props.handleCompletedAnimation}
              />
            </div>
          );
        })}
    </div>
  );
}
