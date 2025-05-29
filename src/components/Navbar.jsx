import { NavLink } from 'react-router-dom'
import { useState } from "react";

const Navbar = () => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => setIsAuthenticated(false);

    return (
    <nav className="bg-purple-700 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
                <NavLink to="/" className="hover:underline">
                    Dragon Ball Shop
                </NavLink>
            </h1>
            <ul className="flex gap-4">
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? "underline font-bold text-yellow-300" : "hover:underline"}>
                            Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => isActive ? "underline font-bold text-yellow-300" : "hover:underline"}>
                            Nosotros
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contact" 
                        className={({ isActive }) => isActive ? "underline font-bold text-yellow-300" : "hover:underline"}>
                            Contacto
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/cart" 
                        className={({ isActive }) => isActive ? "underline font-bold text-yellow-300" : "hover:underline"}>
                            Carrito
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/admin" 
                        className={({ isActive }) => isActive ? "underline font-bold text-yellow-300" : "hover:underline"}>
                        Admin
                    </NavLink>
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
