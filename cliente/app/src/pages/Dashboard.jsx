import Navbar from "../components/Navbar";
import "./styles/Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Panel Principal</h1>
        <div className="cards">
          <div className="card">Ventas del Mes</div>
          <div className="card">Cotizaciones</div>
          <div className="card">Promociones Activas</div>
        </div>
      </div>
    </>
  );
}
