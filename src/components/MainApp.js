import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import HomePage from "./common/HomePage";
import PrivateRoute from "./common/PrivateRoute";
import Notes from "./common/Notes";
import Todos from "./common/Todos";
import HelperNotes from "./common/helper/HelperNotes";
import HelperTodos from "./common/helper/HelperTodos";
export default function MainApp() {
  return (
    <div>
      <BrowserRouter>
        {/* MainApp */}
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/notes/redirectToNotes" element={<HelperNotes/>} />
            <Route path="/todos/redirectToTodos" element={<HelperTodos/>} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
