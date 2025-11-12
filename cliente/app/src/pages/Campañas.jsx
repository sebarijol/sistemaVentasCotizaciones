import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Campañas.css";

export default function Campañas() {
  const [campañas, setCampañas] = useState([]);

  useEffect(() => {
    api.get("campañas/").then((res) => setCampañas(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Campañas</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Canal</th>
              <th>Inicio</th>
              <th>Fin</th>
            </tr>
          </thead>
          <tbody>
            {campañas.map((c) => (
              <tr key={c.id_campaña}>
                <td>{c.nombre}</td>
                <td>{c.canal}</td>
                <td>{c.fecha_inicio}</td>
                <td>{c.fecha_fin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
