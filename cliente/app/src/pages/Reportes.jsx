// src/pages/Reportes.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Reportes.css";

export default function Reportes() {
  const [reportes, setReportes] = useState({
    ventas_por_mes: [],
    mejores_productos: [],
    stock_critico: [],
    nuevas_clientes: [],
  });
  const [rango, setRango] = useState({ desde: "", hasta: "" });

  useEffect(() => cargar(), []);

  const cargar = () => {
    // Endpoints sugeridos que devuelven los reportes agregados
    api.get("reportes/dashboard/").then(r => setReportes(r.data)).catch(console.error);
  };

  const exportarExcel = (slug) => {
    // suponer endpoint: reportes/export/{slug}/
    api.get(`reportes/export/${slug}/`, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `${slug}.xlsx`;
        a.click();
      })
      .catch(console.error);
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Reportes</h1>

        <div className="filtros">
          <input type="date" value={rango.desde} onChange={(e) => setRango({...rango, desde: e.target.value})} />
          <input type="date" value={rango.hasta} onChange={(e) => setRango({...rango, hasta: e.target.value})} />
          <button onClick={cargar}>Aplicar</button>
        </div>

        <section className="reporte">
          <h2>Ventas por mes</h2>
          <table>
            <thead><tr><th>Mes</th><th>Total</th></tr></thead>
            <tbody>
              {(reportes.ventas_por_mes || []).map(r => (<tr key={r.mes}><td>{r.mes}</td><td>${r.total}</td></tr>))}
            </tbody>
          </table>
          <button onClick={() => exportarExcel("ventas_por_mes")}>Exportar</button>
        </section>

        <section className="reporte">
          <h2>Mejores productos</h2>
          <ul>{(reportes.mejores_productos || []).map(p => <li key={p.id}>{p.nombre} — {p.vendido}</li>)}</ul>
          <button onClick={() => exportarExcel("mejores_productos")}>Exportar</button>
        </section>

        <section className="reporte">
          <h2>Stock crítico</h2>
          <ul>{(reportes.stock_critico || []).map(p => <li key={p.id}>{p.nombre} — {p.stock}</li>)}</ul>
        </section>
      </div>
    </>
  );
}
