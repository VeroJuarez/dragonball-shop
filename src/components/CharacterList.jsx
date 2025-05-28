import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CharacterList = ({ addToCart }) => {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch('https://dragonball-api.com/api/characters?limit=12')
                if (!response.ok) {
                    throw new Error("Error al cargar los personajes")
                }
                const data = await response.json()
                setCharacters(data.items)
            } catch (err) {
                console.error(err)
                setError('No se pudieron cargar los personajes.')
            } finally {
                setLoading(false)
            }
        }
        fetchCharacters()
    }, [])
    if (loading) return <p>Cargando personajes...</p>
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {characters.map((character) => (
                <div
                    key={character.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden p-2 text-center"
                >
                    <figure className="object-cover w-48 h-48 mx-auto overflow-hidden">
                        <img
                            src={character.image}
                            alt={character.name}
                            className="max-w-[200px]"
                        />
                    </figure>
                    <p className="text-gray-600">Raza: {character.race}</p>
                    <p className="text-gray-600">Ki: {character.ki} / {character.maxKi}</p>
                    <button
                        onClick={() => {
                            addToCart(character)
                            alert(`${character.name} fue agregado al carrito.`)
                        }}
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

