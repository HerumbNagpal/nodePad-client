import React from 'react'
import './Modal.css'
export default function Modal(props) {
  return (
    <div className="modal">
          <div onClick={props.toggleshowModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className='modal-heading' >{props.errorText}</h2>
            <button className="close-modal btn" onClick={props.toggleshowModal}>
              CLOSE
            </button>
          </div>
        </div>
  )
}
