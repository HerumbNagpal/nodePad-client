import React, { useState } from "react";
import ViewNote from "./ViewNote";
import { useNavigate } from "react-router-dom";
export default function Note(props) {
  const { _id, title, content } = props;
  const [showViewNote, setShowViewNote] = useState(false);
  const navigate = useNavigate();
  const shortTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;
  const shortContent =
    content.length > 100 ? content.slice(0, 100) + "..." : content;

  const closeViewNote = () => {
    setShowViewNote(false);
  };

  const handleNoteClick = () => {
    // navigate('/notes/viewNote')
    setShowViewNote(true);
  };

  return (
    <div>
      {showViewNote && (
        <ViewNote
          _id={_id}
          title={title}
          content={content}
          closeViewNote={closeViewNote}
        />
      )}

      <div className="note" onClick={handleNoteClick}>
        <div>
          <h2>{shortTitle}</h2>
          {/* <p> {_id} </p> */}
        </div>
        <p>{shortContent}</p>
      </div>
    </div>
  );
}
