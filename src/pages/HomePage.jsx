import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { usePersonajes } from '../context/PersonajeContext'
import { useCarrito } from '../context/CarritoContext'
import Swal from 'sweetalert2'

const HomePage = () => {
  const { personajes } = usePersonajes()
  const { addToCart } = useCarrito()
  const { user } = useAuthContext()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {personajes.length === 0 ? (
        <div className="col-span-full text-center">
          <p className="text-gray-500">No hay productos disponibles en este momento.</p>
        </div>
      ) : (
        personajes.map((personaje) => (
          <div 
              key={personaje.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden p-2 text-center"
          >
              <figure className="object-cover w-48 h-48 mx-auto overflow-hidden">
                  <img 
                      src={personaje.imagen}
                      alt={personaje.nombre} 
                      className="max-w-[200px]"
                  />
              </figure>
              <h3 className="text-lg font-semibold">{personaje.nombre}</h3>
              <p className="text-gray-600">Precio:${personaje.precio}</p>
              <p className="text-gray-600">Stock:{personaje.stock}</p>
              <button
                onClick={() => { addToCart({ ...personaje })}}
                className={`${(!user || user !== "admin")?"hidden":""} mt-2 bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700`}
              >
                Agregar al carrito
              </button>
          </div>
        ))
      )}
    </div>
  )
}

export default HomePage
