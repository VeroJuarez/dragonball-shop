// src/pages/Contact.jsx
import { useState } from "react"

const Contact = () => {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Mensaje enviado. ¡Gracias por contactarte!")
        setForm({ nombre: "", email: "", mensaje: "" })
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Contacto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Mensaje</label>
                    <textarea
                        name="mensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="4"
                        required
                    />
                </div>
                <button
                type="submit"
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
                >
                Enviar
                </button>
            </form>
        </div>
    )
}

export default Contact
