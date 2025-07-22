
import React, { createContext, useContext, useState, useEffect } from 'react'
import Swal from "sweetalert2"

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try{
      const savedCart = localStorage.getItem('carrito')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error al cargar el carrito desde localStorage:', error)
      return []
    }
  })

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cartItems))
  }, [cartItems])

  // Añadir producto al carrito
  const addToCart = (character) => {
    const existingItem = cartItems.find((item) => item.id === character.id)
    
    // Calcular cuántos hay en el carrito actualmente
    const currentQuantity = existingItem ? existingItem.quantity : 0

    // Verificar si ya existe el carrito
    if (existingItem){
      if (currentQuantity < character.stock) {
        const updatedCart = cartItems.map((item) =>
          item.id === character.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        setCartItems(updatedCart)
        Swal.fire({
          icon: "success",
          title: "Producto actualizado",
          text: "Se agregó una unidad al carrito",
          timer: 1500,
          showConfirmButton: false,
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "¡Stock agotado!",
          text: "Ya no hay más stock disponible de este producto.",
        })
      }
    } else {
      if (character.stock > 0){
        setCartItems((cartItems) => [
          ...cartItems,
          { ...character, quantity: 1 }
        ])
        Swal.fire({
          icon: "success",
          title: "Producto añadido",
          text: "Se agregó el producto al carrito",
          timer: 1500,
          showConfirmButton: false,
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Producto sin stock",
          text: "Este producto no está disponible.",
        })
      }
    }
  }

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([])
  }

  // Aumentar cantidad
  const increaseQuantity = (id) => {
    setCartItems((cartItems) =>
      cartItems.map((item) => {
        if (item.id === id) {
          if (item.quantity < item.stock) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            Swal.fire({
              icon: "info",
              title: "Límite alcanzado",
              text: "No se pueden agregar más unidades de este producto.",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        }
        return item
      })
    )
  }

  // Disminuir cantidad
  const decreaseQuantity = (id) => {
    setCartItems((cartItems) =>
    cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // Eliminar producto específico
  const removeFromCart = (id) => {
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== id))
  }

  // Calcular total
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Obtener cantidad total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  };

  return (
    <CarritoContext.Provider value={{
      cartItems,
      addToCart,
      clearCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      getTotal,
      getTotalItems
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de CarritoProvider')
  }
  return context
}