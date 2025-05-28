import CharacterList from "../components/CharacterList";

const CharacterPage = ({ handleAddToCart }) => {
    return (
        <div className="container mt-4">
            <h2>Personajes</h2>
            <CharacterList handleAddToCart={handleAddToCart} />
        </div>
    );
};

export default CharacterPage