// src/pages/campañas.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/campanas.css";

export default function campañas() {
  const [campañas, setcampañas] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);

  const [mostrarForm, setMostrarForm] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tipo: "email",
    contenido: "",
    objetivo_etiquetas: [],
    programada_para: "",
  });

  // Cargar campañas y etiquetas
  useEffect(() => {
    api.get("campañas/")
      .then((r) => setcampañas(r.data))
      .catch(console.error);

    api.get("etiquetas/")
      .then((r) => setEtiquetas(r.data))
      .catch(console.error);
  }, []);

  // Manejar cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Select múltiple para etiquetas
    if (name === "objetivo_etiquetas") {
      const seleccionadas = Array.from(
        e.target.selectedOptions,
        (o) => Number(o.value)
      );
      setForm({ ...form, objetivo_etiquetas: seleccionadas });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  // Guardar campaña
  const guardar = (e) => {
  e.preventDefault();

  // Crear payload copiando el form
  const payload = { ...form };

  // Si hay programada_para (datetime-local: "YYYY-MM-DDTHH:mm"), convertir a ISO
  if (form.programada_para) {
    // new Date(...) interpreta "YYYY-MM-DDTHH:mm" como local time
    // toISOString() devuelve en formato aceptado por DRF: "YYYY-MM-DDTHH:mm:ss.sssZ"
    payload.programada_para = new Date(form.programada_para).toISOString();
  } else {
    payload.programada_para = null;
  }

  api.post("campañas/", payload)
    .then(() => {
      setMostrarForm(false);
      setForm({
        nombre: "",
        descripcion: "",
        tipo: "email",
        contenido: "",
        objetivo_etiquetas: [],
        programada_para: "",
      });
      return api.get("campañas/");
    })
    .then((r) => setcampañas(r.data))
    .catch(console.error);
};

  // Enviar campaña manualmente
  const enviarCampana = (id) => {
    api.post(`campañas/${id}/enviar/`)
      .then(() => api.get("campañas/"))
      .then((r) => setCampañas(r.data))
      .catch(console.error);
  };

  // Cambiar estado manualmente
  const cambiarEstado = (id, estado) => {
    api.post(`campañas/${id}/cambiar-estado/`, { estado })
      .then(() => api.get("campañas/"))
      .then((r) => setCampañas(r.data))
      .catch(console.error);
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>Campañas</h1>

        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="boton-agregar"
        >
          {mostrarForm ? "Cancelar" : "Nueva Campaña"}
        </button>

        {mostrarForm && (
          <form onSubmit={guardar} className="form-campana">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={handleChange}
            />

            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
            >
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="notificacion">Notificación interna</option>
            </select>

            <textarea
              name="contenido"
              placeholder="Contenido del mensaje"
              value={form.contenido}
              onChange={handleChange}
              required
            />

            <label>Etiquetas objetivo:</label>
            <select
              name="objetivo_etiquetas"
              multiple
              className="select-etiquetas"
              value={form.objetivo_etiquetas}
              onChange={handleChange}
            >
              {etiquetas.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>

            <label>Programar envío (opcional):</label>
            <input
              type="datetime-local"
              name="programada_para"
              value={form.programada_para}
              onChange={handleChange}
            />

            <button type="submit" className="boton-guardar">
              Guardar
            </button>
          </form>
        )}

        <table className="tabla-campañas">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Etiquetas</th>
              <th>Programada</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {campañas.map((c) => (
              <tr key={c.id_campaña}>
                <td>{c.nombre}</td>
                <td>{c.tipo}</td>
                <td>
                  {(c.objetivo_etiquetas || []).length > 0
                    ? c.objetivo_etiquetas.join(", ")
                    : "-"}
                </td>
                <td>{c.programada_para || "-"}</td>
                <td>{c.estado}</td>

                <td>
                  <button onClick={() => enviarCampana(c.id_campaña)}>
                    Enviar ahora
                  </button>

                  <button
                    onClick={() => cambiarEstado(c.id_campaña, "finalizada")}
                  >
                    Finalizar
                  </button>

                  <button
                    onClick={() => cambiarEstado(c.id_campaña, "fallida")}
                  >
                    Marcar fallida
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
