import { createContext, useContext, useState, useEffect} from "react"

const PersonajeContext = createContext()

export const PersonajeProvider = ({ children }) => {
    const [personajes, setPersonajes] = useState([])

    const API_URL = 'https://687881e963f24f1fdc9e377c.mockapi.io/productos'

    const fetchPersonajes = async () => {
        try {
            const response = await fetch(API_URL)
            if (!response.ok) {
                throw new Error('Error al obtener personajes')
            }
            const data = await response.json()
            setPersonajes(data.items || data)
        } catch (error) {
            console.error("Error al obtener personajes:", error)
        }
    }

    useEffect(() => {
        fetchPersonajes()
    }, [])
    
    return (
        <PersonajeContext.Provider value={{ personajes, fetchPersonajes }}>
            {children}
        </PersonajeContext.Provider>
    )
}

export const usePersonajes = () => useContext(PersonajeContext) 
