const CartPage = ({ cartItems, clearCart }) => {
    return (
        <div className="container mt-4">
            <h2>Mi Carrito</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <>
                    <ul className="list-group mb-3">
                        {cartItems.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {item.name}
                                <span>${item.race}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-danger" onClick={clearCart}>
                        Vaciar Carrito
                    </button>
                </>
            )}
        </div>
    )
}

export default CartPage    
  