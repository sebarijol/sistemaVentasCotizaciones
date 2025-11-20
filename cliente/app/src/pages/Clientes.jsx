import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Clientes.css";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    contacto: "",
    email: "",
    telefono: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    api.get("clientes/").then((res) => setClientes(res.data));
  };

  const handleChange = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("clientes/", nuevoCliente)
      .then(() => {
        setNuevoCliente({ nombre: "", contacto: "", email: "", telefono: "" });
        setMostrarFormulario(false);
        cargarClientes();
      })
      .catch((err) => console.error("Error al agregar cliente:", err));
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Clientes</h1>

        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="boton-agregar"
        >
          {mostrarFormulario ? "Cancelar" : "Agregar Cliente"}
        </button>

        {mostrarFormulario && (
          <form onSubmit={handleSubmit} className="formulario-cliente">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevoCliente.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contacto"
              placeholder="Contacto"
              value={nuevoCliente.contacto}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={nuevoCliente.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={nuevoCliente.telefono}
              onChange={handleChange}
              required
            />
            <button type="submit" className="boton-guardar">Guardar</button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id_cliente}>
                <td>{c.nombre}</td>
                <td>{c.contacto}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
