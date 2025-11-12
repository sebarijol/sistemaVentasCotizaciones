import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./styles/Login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("auth/token/", {
        correo,
        password,
      });
      localStorage.setItem("token", res.data.access);
      navigate("/dashboard");
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
