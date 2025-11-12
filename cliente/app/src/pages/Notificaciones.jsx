import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Notificaciones.css";

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    api.get("notificaciones/").then((res) => setNotificaciones(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Notificaciones</h1>
        <ul>
          {notificaciones.map((n) => (
            <li key={n.id_notificacion}>
              <strong>{n.tipo}</strong> — {n.mensaje} ({n.estado})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
