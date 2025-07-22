import React from 'react';
import { Navigate } from "react-router-dom"
import { useAuthContext} from "../context/AuthContext"

export default function ProtectedRoute({ children }) {
    const  { token } = useAuthContext()
    return token ? children : <Navigate to="/login" />;
}
