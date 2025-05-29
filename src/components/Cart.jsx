import Swal from "sweetalert2";

const Cart = ({ cartItems = [], clearCart, increaseQuantity, decreaseQuantity }) => {
    const handleClearCart = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se vaciará todo el carrito",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart(); // Esta función sí vacía el carrito
                Swal.fire("¡Listo!", "Tu carrito fue vaciado.", "success");
            }
        });
    };
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Mi Carrito</h2>
  
            {cartItems.length === 0 ? (
                <p className="text-gray-500">El carrito está vacío.</p>
            ) : (
            <>
                <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                    {cartItems.map((item) => (
                        <li key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden p-2 text-center">
                            <figure className="object-cover w-48 h-48 mx-auto overflow-hidden">
                                <img src={item.image} alt={item.name} className="max-w-[200px]" />
                            </figure>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-600">Raza: {item.race}</p>
                                <p className="text-sm text-gray-600">Precio: ${item.price}</p>
                                <p className="text-sm text-gray-600">Subtotal: ${item.price * item.quantity}</p>
                                <div className="flex items-center mt-2 gap-2">
                                    <button onClick={() => decreaseQuantity(item.id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded-full mx-auto">
                                            -
                                    </button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item.id)}
                                        className="px-2 py-1 bg-green-500 text-white rounded-full mx-auto">
                                        +
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="text-right mt-4">
                    <p className="text-xl font-bold">
                        Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleClearCart}
                    className="mt-6 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600">
                        Vaciar Carrito
                    </button>
                    <button
                        className="mt-6 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
                        Finalizar Compra
                    </button>
                </div> 
            </>
        )}
        </div>
    );
};
  
export default Cart;
  