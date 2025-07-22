import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductosContext = createContext()

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_URL = 'https://687881e963f24f1fdc9e377c.mockapi.io/productos'

  // Obtener todos los productos
  const fetchProductos = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('Error al obtener productos')
      }
      const data = await response.json()
      setProductos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  };

  // Crear producto
  const createProducto = async (producto) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear producto')
      }
      
      const newProducto = await response.json()
      setProductos(prev => [...prev, newProducto])
      return newProducto
    } catch (err) {
      setError(err.message)
      throw err;
    } finally {
      setLoading(false)
    }
  };

  // Actualizar producto
  const updateProducto = async (id, producto) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar producto')
      }
      
      const updatedProducto = await response.json()
      setProductos(prev => prev.map(p => p.id === id ? updatedProducto : p))
      return updatedProducto
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  };

  // Eliminar producto
  const deleteProducto = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar producto')
      }
      
      setProductos(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  };

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProductos()
  }, []);

  return (
    <ProductosContext.Provider value={{
      productos,
      loading,
      error,
      fetchProductos,
      createProducto,
      updateProducto,
      deleteProducto,
    }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => {
  const context = useContext(ProductosContext)
  if (!context) {
    throw new Error('useProductos debe ser usado dentro de ProductosProvider')
  }
  return context
}