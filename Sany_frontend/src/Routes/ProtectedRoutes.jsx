import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({ children }) {

    let token = localStorage.getItem("authToken")

    if (!token) return <Navigate to="/login" />
    return children;
}

export default ProtectedRoutes;
