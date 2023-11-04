import React, { useState } from "react";
import "./ViewNote.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ViewNote(props) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle,setNewTitle] = useState(props.title);
  const [newContent,setNewContent] = useState(props.content)

  const auth = JSON.parse(sessionStorage.getItem("user"));
  const email = auth ? auth.data.data.email : null;
  const { _id } = props;

  const navigate = useNavigate();
  const handleDeleteNote = async () => {
    const userData = {
      email: email,
      _id: _id,
    };

    // console.log(userData);

    const result = await axios.post(
      "http://localhost:3001/notes/deleteNote",
      userData
    );

    if (result.data.statusCode === 200) {
      props.closeViewNote();
      navigate("/notes/redirectToNotes");
    }
  };

  const handleEditNote = () => {
    setEditMode(!editMode);
  };
  const handleInp = (e) => {
    if (e.target.id === "title") {
      setNewTitle(e.target.value);
    } else {
      setNewContent(e.target.value);
    }
  };

  const handleUpdateNote = async () => {
    const userData = {
      email : email,
      _id : _id,
      title : newTitle,
      content : newContent
    }
    const result = await axios.post('http://localhost:3001/notes/update',userData)
    if(result.data.statusCode===200){
      // setEditMode(!editMode);
      navigate('/notes/redirectToNotes'); 
    }

  }

  return (
    <div className="note-modal">
      <div className="overlay" onClick={props.closeViewNote}></div>
      <div className="note-modal-container">
        <div className=" cross" onClick={props.closeViewNote}>
          <span className="material-symbols-outlined">close</span>
        </div>

        {editMode ? (
          <input
            type="text"
            className="edit-heading"
            value={newTitle}
            onChange={handleInp}
            id="title"
          />
        ) : (
          <h2 className="note-modal-heading"> {props.title} </h2>
        )}
        {/* <p>{props._id}</p> */}

        {editMode ? (
          <textarea
            className="note-modal-content  edit-content"
            id="content"
            value={newContent}
            onChange={handleInp}
            placeholder="Write your heart out"
            style={{fontSize:16,backgroundColor:"#f1f1f1"}}
          />
        ) : (
          <p
            className="note-modal-content"
            style={{ overflowY: props.content.length < 500 ? "hidden" : "" }}
          >
            {props.content}
          </p>
        )}

        {!editMode ? (
          <div className="btnnn" >
            <button className="add-btn" onClick={handleEditNote}>
              EDIT
            </button>
            <button className="close-btn" style={{color:'red'}}   onClick={handleDeleteNote}>
              DELETE
            </button>
          </div>
        ) : (
          <div className="btnnn" style={{marginTop:'18px'}} >
            <button className="add-btn" onClick={handleUpdateNote} > SAVE </button>
            <button className="close-btn" style={{color:'red'}}  onClick={handleEditNote}> CANCEL </button>
          </div>
        )}
      </div>
    </div>
  );
}
