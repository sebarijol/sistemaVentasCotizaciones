import { Link } from "react-router-dom";
import "./styles/Landing.css";


export default function Landing() {
    return (
        <div className="landing-wrapper">
            <section className="hero fade-in">
                <h1 className="title">Impulsa la Gestión de tu Pyme</h1>
                <p className="subtitle">
                    Optimiza ventas, cotizaciones y administración con una plataforma creada
                    para emprendedores.
                </p>
                <div className="hero-buttons">
                    <Link className="btn primary" to="/login">Ingresar</Link>
                    <Link className="btn secondary" to="/registro">Registrar Pyme</Link>
                </div>
            </section>


            <section className="features slide-up">
                <h2>¿Qué puedes hacer aquí?</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Gestión de Ventas</h3>
                        <p>Controla productos, estados de ventas y desempeño en tiempo real.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Cotizaciones Profesionales</h3>
                        <p>Genera y envía cotizaciones personalizadas para tus clientes.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Panel para Pymes</h3>
                        <p>Accede a reportes, estadísticas y administración completa de tu negocio.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}