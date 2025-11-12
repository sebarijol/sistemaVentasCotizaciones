import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Clientes.css";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    api.get("clientes/").then((res) => setClientes(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Clientes</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id_cliente}>
                <td>{c.nombre}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
