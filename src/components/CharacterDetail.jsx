import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2";

// Agregá más personajes, solo use 12 personajes
const PRICE_MAP = {
    "Goku": 30000,
    "Vegeta": 28000,
    "Bulma": 15000,
    "Piccolo": 20000,
    "Freezer": 50000,
    "Zarbon": 12000,
    "Dodoria": 18000,
    "Ginyu": 22000,
    "Cell": 50000,
    "Gohan": 25000,
    "Tenshinhan": 27000,
    "Krillin": 18000,
};

const CharacterDetail = ({ addToCart }) => {
    const { id } = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const res = await fetch(`https://dragonball-api.com/api/characters/${id}`);
                if (!res.ok) {
                    throw new Error("Error al obtener el personaje");
                }
    
                const data = await res.json();
    
                // Agregarle un precio manual si está en el PRICE_MAP
                const enrichedCharacter = {
                    ...data,
                    price: PRICE_MAP[data.name] || 20000,
                };
    
                setCharacter(enrichedCharacter);
    
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCharacter();
    }, [id]);
    

    if (loading) return <p>Cargando personaje...</p>;
    if (error) return  <p className="text-red-600 text-center mt-4">Error: {error}</p>
    if (!character) return <p className="text-center mt-4">Personaje no encontrado.</p>

    const handleAddToCart = () => {
        addToCart(character);
        Swal.fire({
            icon: "success",
            title: "Agregado al carrito",
            text: `${character.name} fue agregado al carrito.`,
            timer: 1500,
            showConfirmButton: false,
        });
    };
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
                <li><strong>Origen:</strong> {character.originPlanet?.name || "Desconocido"}</li>
                <li><strong>Ki base:</strong> {character.ki}</li>
                <li><strong>Ki máximo:</strong> {character.maxKi}</li>
                <li><strong>Precio:$</strong> {character.price}</li>
                <li className="text-justify"><strong>Descripción:</strong> {character.description}</li>
            </ul>
            <button
                onClick={handleAddToCart}
                className="mt-2 bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700">
                Agregar al carrito
            </button>
            {character.transformations?.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Transformaciones:</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {character.transformations.map((trans) => (
                            <div key={trans.id} className="bg-white shadow p-2 rounded-lg text-center">
                                <img src={trans.image} alt={trans.name} className="w-24 h-24 object-contain mx-auto" />
                                <p className="font-medium">{trans.name}</p>
                                <p className="text-sm">Ki: {trans.ki}</p>
                            </div>
                        ))}
                    </div>
                </div>
                )}
        </div>
    )
};
    
export default CharacterDetail;
