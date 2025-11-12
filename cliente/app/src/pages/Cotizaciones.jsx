import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Cotizaciones.css";

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    api.get("cotizaciones/").then((res) => setCotizaciones(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Cotizaciones</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map((c) => (
              <tr key={c.id_cotizacion}>
                <td>{c.id_cotizacion}</td>
                <td>{c.cliente}</td>
                <td>{c.vendedor}</td>
                <td>{c.fecha}</td>
                <td>${c.total}</td>
                <td>{c.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
