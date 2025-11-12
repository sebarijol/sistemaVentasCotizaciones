import Navbar from "../components/Navbar";
import "./styles/Reportes.css";

export default function Reportes() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Reportes y Métricas</h1>
        <div className="report">
          <p>Aquí se mostrarán gráficos de ventas y campañas.</p>
        </div>
      </div>
    </>
  );
}
