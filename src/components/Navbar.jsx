import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const { token, user, logout } = useAuthContext();
  const navigate = useNavigate();
  //const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-purple-600 shadow-md p-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold">
            Dragon Ball Shop
        </h1>

        {/* Menú desktop */}
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/about" className="hover:underline">Nosotros</Link>
          <Link to="/contact" className="hover:underline">Contacto</Link>
          <Link to="/cart" className="hover:underline">Carrito</Link>

          {token ? (
            <>
                <span className="text-sm">Hola, <strong>{user}</strong></span>
                <Link to="/dashboard" className="hover:underline">Administrar</Link>
                <button
                    onClick={handleLogout}
                    className="ml-2 px-3 py-1 bg-white text-purple-700 rounded-md hover:bg-purple-100 transition"
                >
                    Cerrar sesión
                </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-white text-purple-700 rounded-md hover:bg-purple-100 transition"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
    
        {/* Botón hamburguesa para mobile 
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

       Menú mobile
      {menuOpen && (
        <div className="md:hidden bg-purple-600 px-4 pb-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>Nosotros</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contacto</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Carrito</Link>

          {token ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <span>Hola, <strong>{user}</strong></span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="mt-2 px-3 py-1 bg-white text-purple-700 rounded-md hover:bg-purple-100 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-1 bg-white text-purple-700 rounded-md hover:bg-purple-100 transition"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      )}
      */}
    </nav>
  );
}
