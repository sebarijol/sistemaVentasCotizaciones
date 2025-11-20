import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [pymes, setPymes] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    sku: "",
    precio: "",
    pyme: "", // será el id de la pyme seleccionada
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarProductos();
    cargarPymes();
  }, []);

  const cargarProductos = () => {
    api.get("productos/").then((res) => setProductos(res.data)).catch((e) => console.error(e));
  };

  const cargarPymes = () => {
    api.get("pymes/").then((res) => setPymes(res.data)).catch((e) => console.error(e));
  };

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación mínima: sku único en frontend no es posible sin chequear al backend,
    // dejamos que el backend responda en caso de duplicado.
    const payload = {
      nombre: nuevoProducto.nombre,
      sku: nuevoProducto.sku,
      precio: nuevoProducto.precio,
      pyme: nuevoProducto.pyme || null,
    };

    api.post("productos/", payload)
      .then(() => {
        setNuevoProducto({ nombre: "", sku: "", precio: "", pyme: "" });
        setMostrarFormulario(false);
        cargarProductos();
      })
      .catch((err) => {
        console.error("Error al agregar producto:", err);
        // Si quieres, mostrar mensaje de error bonito aquí.
      });
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Productos</h1>

        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="boton-agregar"
        >
          {mostrarFormulario ? "Cancelar" : "Agregar Producto"}
        </button>

        {mostrarFormulario && (
          <form onSubmit={handleSubmit} className="formulario-producto">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevoProducto.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={nuevoProducto.sku}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              step="0.01"
              name="precio"
              placeholder="Precio"
              value={nuevoProducto.precio}
              onChange={handleChange}
              required
            />

            <select
              name="pyme"
              value={nuevoProducto.pyme}
              onChange={handleChange}
              required
            >
              <option value="">-- Selecciona la Pyme --</option>
              {pymes.map((p) => (
                <option key={p.id_pyme} value={p.id_pyme}>
                  {p.nombre}
                </option>
              ))}
            </select>

            <button type="submit" className="boton-guardar">Guardar</button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Precio</th>
              <th>Pyme</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id_producto}>
                <td>{p.nombre}</td>
                <td>{p.sku}</td>
                <td>${p.precio}</td>
                <td>{p.pyme && (typeof p.pyme === "object" ? p.pyme.nombre : p.pyme)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
