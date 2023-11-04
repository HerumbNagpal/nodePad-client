import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function HelperTodos() {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/todos')
    },[])
  return (
    <div className='tdHelper'></div>
  )
}
