import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Sistema de Ventas</h2>
      </div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Inicio</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/cotizaciones">Cotizaciones</Link></li>
        <li><Link to="/campañas">Campañas</Link></li>
        <li><Link to="/notificaciones">Notificaciones</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}
