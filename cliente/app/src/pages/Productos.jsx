import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get("productos/").then((res) => setProductos(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Productos</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id_producto}>
                <td>{p.nombre}</td>
                <td>{p.marca}</td>
                <td>{p.tipo}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
