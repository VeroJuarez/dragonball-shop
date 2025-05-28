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
import Contact from "./components/Contact.jsx"
import Login from "./components/Login.jsx"

const App = () => {
    const [cartItems, setCartItems] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Añadir producto al carrito
    const addToCart = (character) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === character.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === character.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    );
                } else {
                    return [...prevCart, { ...character, quantity: 1 }];
            }
        })
        alert(`${character.name} fue agregado al carrito.`);
    }
    // Vaciar carrito
    const clearCart = () => {
        setCartItems([]);
    };

    // Agregar más cantidad del producto en el carrito
    const increaseQuantity = (id) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };
    
    // Quitar cantidad del producto en el carrito
    const decreaseQuantity = (id) => {
        setCartItems((prevCart) =>
            prevCart
            .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0)
        );
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
                <Route path="/cart" 
                    element={<Cart cartItems={cartItems} 
                    clearCart={clearCart} 
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}/>}
                />
                
                {/* Rutas protegidas */}
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