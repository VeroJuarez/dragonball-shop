import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const CharacterDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const res = await fetch(`https://www.dragonball-api.com/api/character/${id}`)
                if (!res.ok) {
                    throw new Error("Error al obtener el personaje")
                }
                const data = await res.json()
                setCharacter(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        };

        fetchCharacter();
    }, [id]);

    if (loading) return <p>Cargando personaje...</p>;
    if (error) return  <p className="text-red-600 text-center mt-4">Error: {error}</p>
    if (!character) return <p className="text-center mt-4">Personaje no encontrado.</p>

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">{character.name}</h2>
            <img
                src={character.image}
                alt={character.name}
                className="w-60 h-60 object-contain mx-auto mb-4"
            />
            <ul className="space-y-2 text-lg">
                <li><strong>Raza:</strong> {character.race}</li>
                <li><strong>Género:</strong> {character.gender}</li>
                <li><strong>Origen:</strong> {character.origin}</li>
                <li><strong>Ki:</strong> {character.ki}</li>
                <li><strong>Descripción:</strong> {character.description}</li>
            </ul>
        </div>
      );
};
    
export default CharacterDetail;
