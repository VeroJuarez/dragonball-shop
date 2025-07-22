import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { ProductoProvider } from './context/ProductoContext.jsx'
import { PersonajeProvider } from './context/PersonajeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <PersonajeProvider>
          <CarritoProvider>
            <ProductoProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
          </ProductoProvider>
        </CarritoProvider>
        </PersonajeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
