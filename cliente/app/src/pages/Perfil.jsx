import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./styles/Perfil.css";

export default function Perfil() {
  const [pyme, setPyme] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/auth/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log("Error al cargar usuario:", err));
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/pymes/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPyme(data))
      .catch((err) => console.log("Error al cargar datos de la Pyme:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="perfil-container">
        <h1 className="perf il-title">Perfil</h1>
        <div className="perfil-section">
          <p className="perfil-label">Nombre actual: {user?.nombre}</p>
          <input className="perfil-input"/>
          <button className="perfil-btn">Guardar nombre</button>
        </div>
        <div className="perfil-section">
          <p className="perfil-label">Correo actual: {user?.correo}</p>
          <input className="perfil-input"/>
          <button className="perfil-btn">Guardar correo</button>
        </div>
        <div className="perfil-section">
          <p className="perfil-label">Nombre de la Pyme: {pyme?.nombre}</p>
          <input className="perfil-input"/>
          <button className="perfil-btn">Guardar nombre de la Pyme</button>
        </div>
      </div>
    </>
  );
}
