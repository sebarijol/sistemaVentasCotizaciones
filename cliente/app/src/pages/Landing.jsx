import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="landing-container">
            <h1>Sistema de Ventas</h1>
            <p>Por favor inicie sesión para acceder a la plataforma</p>
            <Link to="/login">Iniciar Sesión</Link>
            <p>¿No tienes una cuenta? <Link to="/registro">Registrarme</Link></p>
        </div>
    );
}