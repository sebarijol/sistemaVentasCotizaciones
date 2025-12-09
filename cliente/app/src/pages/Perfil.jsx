import React, { useEffect, useState } from "react";
import "./styles/Perfil.css";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [nombreEdit, setNombreEdit] = useState("");
  const [correoEdit, setCorreoEdit] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/auth/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setNombreEdit(data.nombre || "");
        setCorreoEdit(data.correo || "");
      })
      .catch((err) => console.log("Error al cargar usuario:", err));
  }, []);

  const actualizarCampo = async (campo, valor) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/actualizar/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [campo]: valor }),
      });

      if (!res.ok) throw new Error("Error en la actualización");

      const updated = await res.json();
      setUser(updated);
      setMessage("Datos actualizados correctamente");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error(err);
      setMessage("Hubo un problema al actualizar");
    }
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Perfil</h1>

      {message && <p className="perfil-msg">{message}</p>}

      <div className="perfil-section">
        <p className="perfil-label">Nombre actual:</p>
        <p className="perfil-value">{user.nombre}</p>

        <input
          value={nombreEdit}
          onChange={(e) => setNombreEdit(e.target.value)}
          className="perfil-input"
        />
        <button
          className="perfil-btn"
          onClick={() => actualizarCampo("nombre", nombreEdit)}
        >
          Guardar nombre
        </button>
      </div>

      <div className="perfil-section">
        <p className="perfil-label">Correo actual:</p>
        <p className="perfil-value">{user.correo}</p>

        <input
          value={correoEdit}
          onChange={(e) => setCorreoEdit(e.target.value)}
          className="perfil-input"
        />
        <button
          className="perfil-btn"
          onClick={() => actualizarCampo("correo", correoEdit)}
        >
          Guardar correo
        </button>
      </div>
    </div>
  );
}
