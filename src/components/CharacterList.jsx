import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CharacterList = ({ addToCart }) => {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch("https://www.dragonball-api.com/api/character")
                if (!response.ok) {
                    throw new Error("Error al cargar los personajes")
                }
                const data = await response.json()
                setCharacters(data.items || data) // según cómo venga la estructura
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchCharacters()
    }, [])
    if (loading) return <p>Cargando personajes...</p>
    if (error) return <p>Error al cargar personajes. Intenta más tarde.</p>

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {characters.map((character) => (
                <div
                    key={character.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden p-2 text-center"
                >
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <h3 className="text-lg font-semibold mt-2">{character.name}</h3>
        
                    <Link
                        to={`/characters/${character.id}`}
                        className="block text-blue-600 underline mt-1"
                    >
                        Ver Detalle
                    </Link>

                    <button
                        onClick={() => addToCart(character)}
                        className="mt-2 bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700"
                    >
                        Agregar al carrito
                    </button>
                </div>
            ))}
        </div>
    );
};
    
export default CharacterList;

