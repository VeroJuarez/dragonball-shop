import { Link } from 'react-router-dom'
import { useState } from "react";

const Navbar = () => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => setIsAuthenticated(false);

    return (
    <nav className="bg-purple-700 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
                <Link to="/">Dragon Ball Shop</Link>
            </h1>
            <ul className="flex gap-4">
                <li>
                    <Link to="/" className="hover:underline">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="hover:underline">
                        Nosotros
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:underline">
                        Contacto
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className="hover:underline">
                        Carrito
                    </Link>
                </li>
                <li>
                    <Link to="/admin" className="hover:underline">
                        Admin
                    </Link>
                </li>
            </ul>
            <div>
                {!isAuthenticated ? (
                    <button
                    onClick={handleLogin}
                    className="bg-green-500 px-3 py-1 rounded"
                    >
                        Iniciar sesión
                    </button>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                        Cerrar sesión
                    </button>
                )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar;
