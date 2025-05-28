import { useNavigate } from 'react-router-dom'

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsAuthenticated(true)
    navigate('/admin')
  }

  return (
    <div className="container mt-4">
      <h2>Iniciar Sesión</h2>
      <button className="btn btn-success" onClick={handleLogin}>
        Iniciar Sesión
      </button>
    </div>
  )
}

export default Login