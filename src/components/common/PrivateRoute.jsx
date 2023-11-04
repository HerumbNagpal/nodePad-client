import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const auth = JSON.parse(sessionStorage.getItem("user"));
  // const email = auth ? auth.email : null;

  return (
    auth ? <Outlet /> : <Navigate to='/login' />
  )
}
