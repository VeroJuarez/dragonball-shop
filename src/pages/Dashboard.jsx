import { useAuthContext } from "../context/AuthContext"
import { useProductos } from "../context/ProductoContext"
import { usePersonajes } from "../context/PersonajeContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Swal from "sweetalert2"

export default function Dashboard() {
  const { user, logout } = useAuthContext()
  const { fetchPersonajes } = usePersonajes()
  const { productos, loading, error, createProducto, updateProducto, deleteProducto, fetchProductos} = useProductos()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [editingProduct, setEditingProduct] = useState(null)

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagen: ""
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "Nombre requerido"
    if (!form.precio || Number(form.precio) <= 0)
      newErrors.precio = "Precio debe ser mayor a 0"
    if (!form.stock || Number(form.stock) < 0)
      newErrors.stock = "Stock debe ser un número positivo"
    if (!form.descripcion || form.descripcion.length < 10)
      newErrors.descripcion = "Descripción debe tener al menos 10 caracteres"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      if (editingProduct) {
        await updateProducto(editingProduct.id, form)
        await fetchProductos()
        await fetchPersonajes()
        Swal.fire("¡Éxito!", "Producto actualizado correctamente", "success")
        setEditingProduct(null)
      } else {
        await createProducto(form)
        await fetchPersonajes()
        Swal.fire("¡Éxito!", "Producto agregado correctamente", "success")
      }
      setForm({ nombre: "", precio: "", stock:"", descripcion: "", imagen: "" })
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    }
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock || "",
      descripcion: producto.descripcion,
      imagen: producto.imagen || ""
    });
  };

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el producto "${nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteProducto(id)
        await fetchPersonajes()
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success')
      } catch (error) {
        Swal.fire('Error', error.message, 'error')
      }
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null)
    setForm({ nombre: "", precio: "", descripcion: "" })
    setErrors({})
  };

  if (loading) return <div className="p-8 text-center">Cargando...</div>
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Panel de <span className="text-purple-600">{user}</span></h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">
              {editingProduct ? 'Editar producto' : 'Agregar nuevo producto'}
            </h3>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Nombre del producto</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ej: Goku figura"
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Precio</label>
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ej: 25000"
              />
              {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ej: 100"
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Descripción del producto (mínimo 10 caracteres)"
              />
              {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Imagen</label>
              <input
                type="text"
                name="imagen"
                placeholder="URL de la imagen del producto"
                value={form.imagen || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition flex-1"
              >
                {editingProduct ? 'Actualizar producto' : 'Agregar producto'}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de productos */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-700">Productos existentes</h3>
          <div className="bg-white shadow-md rounded-lg p-6 max-h-96 overflow-y-auto">
            {productos.length === 0 ? (
              <p className="text-gray-500 text-center">No hay productos registrados</p>
            ) : (
              <div className="space-y-4">
                {productos.map((producto) => (
                  <div key={producto.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{producto.nombre}</h4>
                        <p className="text-green-600 font-medium">Precio: ${producto.precio}</p>
                        <p className="text-gray-600 text-sm mt-1">Strock: {producto.stock}</p>
                        <p className="text-gray-600 text-sm mt-1">{producto.descripcion}</p>
                        {producto.imagen && (
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="mt-2 max-w-[150px] rounded"
                          />
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(producto)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(producto.id, producto.nombre)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
