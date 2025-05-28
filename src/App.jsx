import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react'
import Navbar from "./components/Navbar.jsx"
import Header from "./components/Header"

// Páginas
import CharacterList from "./components/CharacterList.jsx"
import Cart from "./components/Cart.jsx"
import CharacterDetail from "./components/CharacterDetail.jsx"
import About from "./components/About.jsx"
import Contact from "./pages/Contact.jsx"
import Login from "./components/Login.jsx"



const App = () => {
    const [cartItems, setCartItems] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Añadir producto al carrito
    const addToCart = (character) => {
        if (!cartItems.some((item) => item.id === character.id)) {
            setCartItems([...cartItems, character])
        }
    }
    // Vaciar carrito
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <Router>
            <Header/>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<CharacterList addToCart={addToCart} />} />
                <Route path="/characters/:id" element={<CharacterDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                
                {/* Rutas protegidas */}
                <Route path="/cart"
                    element={
                    isAuthenticated ? (
                        <Cart cartItems={cartItems} clearCart={clearCart} />
                    ) : (
                        <Navigate to="/" />
                    )
                } 
            />
            <Route path="/admin" 
                element={
                    isAuthenticated ? (
                        <h2 className="text-center mt-8">Bienvenido al panel de admin</h2>
                    ) : (
                        <Navigate to="/" />
                    )
                }
            />
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
    )
}

export default App