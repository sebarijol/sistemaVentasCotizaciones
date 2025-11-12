import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/CotizacionForm.css";

export default function CotizacionForm() {
  const [cliente, setCliente] = useState("");
  const [productos, setProductos] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("cotizaciones/", { cliente, productos });
      setMensaje("Cotización creada exitosamente");
    } catch {
      setMensaje("Error al crear la cotización");
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h1>Nueva Cotización</h1>
        <form onSubmit={handleSubmit}>
          <label>Cliente</label>
          <input value={cliente} onChange={(e) => setCliente(e.target.value)} />

          <label>Productos</label>
          <input
            value={productos}
            onChange={(e) => setProductos(e.target.value)}
          />

          <button type="submit">Guardar</button>
          {mensaje && <p className="msg">{mensaje}</p>}
        </form>
      </div>
    </>
  );
}
