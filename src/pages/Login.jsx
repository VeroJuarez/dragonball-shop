import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const { login, token } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if(token){
      navigate("/dashboard")
    }
  }, [token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulación de autenticación
    if (login(user, password)) {
      navigate('/dashboard')
    } else {
      setError("Usuario o contraseña inválidos")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <label className="block mb-2">Usuario</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label className="block mb-2">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  )
}