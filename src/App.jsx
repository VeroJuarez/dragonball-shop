import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Header from "./components/Header.jsx"
import { useCarrito } from "./context/CarritoContext.jsx"

// Páginas
import HomePage from "./pages/HomePage.jsx"
import Cart from "./pages/Cart.jsx"
import About from "./components/About.jsx"
import Contact from "./components/Contact.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import ProtectedRoute from "../src/components/ProtectedRoute.jsx"

const App = () => {
    const { cartItems, addToCart, clearCart, increaseQuantity, decreaseQuantity } = useCarrito()
    
    return (
        <>
            <Header/>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                
                {/* Rutas protegidas */}
                <Route path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/cart" 
                    element={
                        <ProtectedRoute>
                            <Cart cartItems={cartItems} 
                            clearCart={clearCart} 
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    )
}

export default App