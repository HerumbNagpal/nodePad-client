import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import NewNote from "./NewNote";
import axios from "axios";
import Note from "./Note";
import PageTurner from "./PageTurner";

export default function Notes() {
  const [isLoading, setIsLoading] = useState(true);
  const [showNewNote, setShowNewNote] = useState(false);
  const [userNotes, setUserNotes] = useState([]);
  const [pageTurning, setPageTurning] = useState(false);

  const navigate = useNavigate();

  const auth = JSON.parse(sessionStorage.getItem("user"));
  const email = auth ? auth.data.data.email : null;

  const fetchNotes = async () => {
    const userData = {
      email: email,
    };
    const result = await axios.post(
      "http://localhost:3001/notes/findAll",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(result.data.data)
    setUserNotes(result.data.data);
  };

  useEffect(() => {
    fetchNotes();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const [start, setStart] = useState(0);
  const displayNotes = userNotes.slice(start, start + 3);

  const handleNextNote = () => {
    setPageTurning(true);
    const newStart = Math.min(
      start + 1,
      userNotes.length - displayNotes.length
    );
    setStart(newStart);
    setTimeout(() => {
      setPageTurning(false);
    }, 400);
  };

  const handlePrevNot = () => {
    setPageTurning(true);
    const newStart = Math.max(start - 1, 0);
    setStart(newStart);
    setTimeout(() => {
      setPageTurning(false);
    }, 400);
  };

  const closeNewNote = () => {
    setShowNewNote(false);
  };
  const handleAddNote = () => {
    setShowNewNote(true);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div
      className="notes"
      style={{ backgroundColor: isLoading ? "#8acdeb" : "#f6f2f1" }}
    >
      {/* <>.</> */}
      {isLoading && <Loader />}
      {pageTurning && <PageTurner />}
      {!isLoading && !pageTurning &&(
        <div>
          <p className="goHome" onClick={handleHome}>
            Home
          </p>
          <div className="nHeading">
            <h1>Notes</h1>

            <span
              style={{
                fontSize: "50px",
                cursor: "pointer",
              }}
              className="material-symbols-outlined"
              onClick={handleAddNote}
            >
              add_circle
            </span>
          </div>
          {userNotes.length > 0 && (
            <div className="notesContainer">
              {start != 0 && (
                <div className="lArrow">
                  <h2 onClick={start === 0 ? null : handlePrevNot}>
                    <span className="material-symbols-outlined">
                      arrow_back_ios
                    </span>
                  </h2>
                </div>
              )}
              <div className="noteContainer">
                {displayNotes.map((note, index) => {
                  return (
                    <div key={index}>
                      <Note
                        _id={note._id}
                        title={note.title}
                        content={note.content}
                      />
                    </div>
                  );
                })}
              </div>

              {start !== userNotes.length - displayNotes.length && (
                <div className="rArrow">
                  <h2 onClick={ start === userNotes.length - displayNotes.length? null : handleNextNote } >
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </h2>
                </div>
              )}
            </div>
          )}

          {userNotes.length === 0 && <p>Start writing notes.</p>}
          {/* <p>{userNotes.length}</p> */}
        </div>
      )}

      {showNewNote && <NewNote closeNewNote={closeNewNote} />}
    </div>
  );
}
