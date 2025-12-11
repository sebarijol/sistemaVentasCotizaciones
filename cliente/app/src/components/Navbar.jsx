import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setOpenMenu(!openMenu);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Obtener usuario desde backend Django
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

      {/* Avatar + Dropdown */}
      <div className="navbar-user">
        <img
          src={user?.foto || "https://i.pravatar.cc/40"}
          alt="user"
          className="user-avatar"
          onClick={toggleMenu}
        />

        {openMenu && (
          <div className="dropdown-menu">

            {/* Información del usuario */}
            <div className="dropdown-user-info">
              {user?.nombre}
            </div>

            <hr className="dropdown-separator" />

            <Link to="/perfil" className="dropdown-item">Perfil</Link>

            <button className="dropdown-item logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
