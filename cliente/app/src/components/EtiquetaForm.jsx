import { useState } from "react";
import api from "../services/api";

export default function EtiquetaForm({ onCreada }) {
  const [nombre, setNombre] = useState("");

  const crearEtiqueta = () => {
    api
      .post("etiquetas/", { nombre })
      .then((res) => {
        setNombre("");
        onCreada(res.data);
      })
      .catch((err) => console.error("Error al crear etiqueta:", err));
  };

  return (
    <div className="form-etiqueta">
      <input
        type="text"
        placeholder="Nueva etiqueta"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <button type="button" onClick={crearEtiqueta}>
        Agregar
      </button>
    </div>
  );
}
