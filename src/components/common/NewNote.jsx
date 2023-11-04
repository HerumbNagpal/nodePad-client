import React, { useState } from "react";
import "../styles.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function NewNote(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate= useNavigate();
  const auth = JSON.parse(sessionStorage.getItem("user"));
  const email = auth.data.data.email;

  const handleInp = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else {
      setContent(e.target.value);
    }
  };

  const handleAddNote = async () => {
    const userData = {
      email: email,
      title: title,
      content: content,
    };
    const result = await axios.post(
      "http://localhost:3001/notes/add",
      userData
    );
    if(result.data.statusCode === 201 ){
      navigate('/notes/redirectToNotes');
    }
  };
  return (
    <div className="newNote">
      NewNote
      <div className="noteOverlay"></div>
      <div className="newNote-content">
        <input
          className="newNote-heading"
          id="title"
          value={title}
          onChange={handleInp}
          placeholder="Title"
        />
        <textarea
          className="newNote-desc"
          id="content"
          value={content}
          onChange={handleInp}
          placeholder="Write your heart out"
        />
        {/* <h2 className="newNote-heading">Note Title</h2>
        <p className="newNote-desc">Write your heart out......</p> */}
        <div className="btnnn">
          <button className="add-btn" disabled = {title.length ===0 || content.length === 0 ? true : false } style={{backgroundColor : title.length ===0 || content.length === 0 ? 'grey' : '', cursor : title.length ===0 || content.length === 0 ? 'not-allowed' : '' }} onClick={handleAddNote} >ADD</button>
          <button className="close-btn" onClick={props.closeNewNote}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
