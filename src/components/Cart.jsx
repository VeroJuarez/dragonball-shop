const Cart = ({ cartItems, clearCart }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Carrito de personajes</h2>
  
            {cartItems.length === 0 ? (
                <p className="text-gray-500">El carrito está vacío.</p>
            ) : (
            <>
                <ul className="grid md:grid-cols-2 gap-4">
                    {cartItems.map((item) => (
                    <li
                    key={item.id}
                    className="flex items-center space-x-4 bg-gray-100 p-4 rounded-xl"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">Raza: {item.race}</p>
                        </div>
                    </li>
                    ))}
                </ul>
  
                <button
                onClick={clearCart}
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                >
                    Vaciar Carrito
                </button>
            </>
        )}
        </div>
    );
};
  
export default Cart;
  