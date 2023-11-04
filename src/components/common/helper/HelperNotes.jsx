import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles.css'
export default function HelperNotes() {
    const navigate = useNavigate();
    useEffect(()=>{
        // const destination = window.location.
        navigate('/notes')
    })
  return (
    <div className='redirector'>
    </div>
  )
}
