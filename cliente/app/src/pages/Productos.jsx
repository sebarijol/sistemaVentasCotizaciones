import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [pymes, setPymes] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);

  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarAdminEtiquetas, setMostrarAdminEtiquetas] = useState(false);
  const [mostrarPopupEtiquetas, setMostrarPopupEtiquetas] = useState(null);

  const [nuevaEtiqueta, setNuevaEtiqueta] = useState("");
  const [editandoEtiqueta, setEditandoEtiqueta] = useState(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    sku: "",
    precio: "",
    pyme: "",
    etiquetas: [],
  });

  useEffect(() => {
    cargarProductos();
    cargarPymes();
    cargarEtiquetas();
  }, []);

  const cargarProductos = () => {
    api.get("productos/")
      .then((res) => setProductos(res.data))
      .catch(console.error);
  };

  const cargarPymes = () => {
    api.get("pymes/")
      .then((res) => setPymes(res.data))
      .catch(console.error);
  };

  const cargarEtiquetas = () => {
    api.get("etiquetas/")
      .then((res) => setEtiquetas(res.data))
      .catch(console.error);
  };

  const eliminarProducto = (id) => {
    if (!confirm("¿Deseas eliminar este producto?")) return;
    api.delete(`productos/${id}/`)
      .then(cargarProductos)
      .catch(console.error);
  };

  const comenzarEdicion = (p) => {
    setEditando(p);
    setMostrarFormulario(true);
    setNuevoProducto({
      nombre: p.nombre,
      sku: p.sku,
      precio: p.precio,
      pyme: p.pyme?.id_pyme ?? "",
      etiquetas: p.etiquetas.map((e) => e.id),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const agregarEtiqueta = (id) => {
    if (nuevoProducto.etiquetas.includes(id)) return;
    setNuevoProducto({
      ...nuevoProducto,
      etiquetas: [...nuevoProducto.etiquetas, id],
    });
  };

  const quitarEtiqueta = (id) => {
    setNuevoProducto({
      ...nuevoProducto,
      etiquetas: nuevoProducto.etiquetas.filter((e) => e !== id),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      nombre: nuevoProducto.nombre,
      sku: nuevoProducto.sku,
      precio: nuevoProducto.precio,
      pyme: nuevoProducto.pyme || null,
      etiquetas: nuevoProducto.etiquetas
        .filter((id) => id !== null && id !== undefined && id !== "null" && id !== "undefined")
        .map(id => Number(id))
    };

    if (editando) {
      api.put(`productos/${editando.id_producto}/`, payload)
        .then(() => {
          limpiarFormulario();
          cargarProductos();
        })
        .catch(console.error);
      return;
    }

    api.post("productos/", payload)
      .then(() => {
        limpiarFormulario();
        cargarProductos();
      })
      .catch(console.error);
  };

  const limpiarFormulario = () => {
    setEditando(null);
    setMostrarFormulario(false);
    setNuevoProducto({
      nombre: "",
      sku: "",
      precio: "",
      pyme: "",
      etiquetas: [],
    });
  };

  // =====================================================
  // ADMINISTRACIÓN DE ETIQUETAS
  // =====================================================
  const crearEtiqueta = () => {
    if (!nuevaEtiqueta.trim()) return;

    api.post("etiquetas/", { nombre: nuevaEtiqueta })
      .then(() => {
        setNuevaEtiqueta("");
        cargarEtiquetas();
      });
  };

  const guardarEtiquetaEditada = () => {
    api.put(`etiquetas/${editandoEtiqueta.id}/`, { nombre: editandoEtiqueta.nombre })
      .then(() => {
        setEditandoEtiqueta(null);
        cargarEtiquetas();
      });
  };

  const eliminarEtiqueta = (id) => {
    if (!confirm("¿Eliminar etiqueta?")) return;
    api.delete(`etiquetas/${id}/`)
      .then(cargarEtiquetas);
  };

  // =====================================================

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>Productos</h1>

        <div className="acciones-superiores">
          <button
            onClick={() => {
              limpiarFormulario();
              setMostrarFormulario(!mostrarFormulario);
            }}
            className="boton-agregar"
          >
            {mostrarFormulario ? "Cancelar" : "Agregar Producto"}
          </button>

          <button
            className="boton-agregar"
            onClick={() => setMostrarAdminEtiquetas(true)}
          >
            Administrar Etiquetas
          </button>
        </div>


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

            <label className="titulo-etiquetas">Etiquetas</label>

            <div className="contenedor-etiquetas">

              <div className="etiquetas-columna">
                <h4>Disponibles</h4>
                <div className="lista-etiquetas">
                  {etiquetas
                    .filter((e) => !nuevoProducto.etiquetas.includes(e.id))
                    .map((e) => (
                      <span
                        key={e.id}
                        className="chip etiqueta-disponible"
                        onClick={() => agregarEtiqueta(e.id)}
                      >
                        {e.nombre}
                      </span>
                    ))}
                </div>
              </div>

              <div className="etiquetas-columna">
                <h4>Seleccionadas</h4>
                <div className="lista-etiquetas">
                  {etiquetas
                    .filter((e) => nuevoProducto.etiquetas.includes(e.id))
                    .map((e) => (
                      <span
                        key={e.id}
                        className="chip etiqueta-seleccionada"
                        onClick={() => quitarEtiqueta(e.id)}
                      >
                        {e.nombre} ✕
                      </span>
                    ))}
                </div>
              </div>

            </div>

            <button type="submit" className="boton-guardar">
              Guardar
            </button>
          </form>
        )}

        {/* TABLA */}
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Precio</th>
              <th>Pyme</th>
              <th>Etiquetas</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p.id_producto}>
                <td>{p.nombre}</td>
                <td>{p.sku}</td>
                <td>${p.precio}</td>
                <td>{p.pyme?.nombre ?? p.pyme}</td>

                <td>
                  <button
                    className="btn-etiquetas"
                    onClick={() => setMostrarPopupEtiquetas(p)}
                  >
                    Ver etiquetas
                  </button>
                </td>

                <td>
                  <button
                    className="btn-editar"
                    onClick={() => comenzarEdicion(p)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProducto(p.id_producto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================================================== */}
      {/* MODAL ADMINISTRAR ETIQUETAS */}
      {/* ===================================================== */}

      {mostrarAdminEtiquetas && (
        <div className="modal">
          <div className="modal-content">
            <h2>Administrar Etiquetas</h2>

            {/* CREAR NUEVA ETIQUETA */}
            <div className="crear-etiqueta">
              <input
                type="text"
                placeholder="Nueva etiqueta"
                value={nuevaEtiqueta}
                onChange={(e) => setNuevaEtiqueta(e.target.value)}
              />
              <button onClick={crearEtiqueta}>Crear</button>
            </div>

            {/* LISTA DE ETIQUETAS */}
            <ul className="lista-admin-etiquetas">
              {etiquetas.map((e) => (
                <li key={e.id}>
                  {editandoEtiqueta?.id === e.id ? (
                    <>
                      <input
                        value={editandoEtiqueta.nombre}
                        onChange={(ev) =>
                          setEditandoEtiqueta({
                            ...editandoEtiqueta,
                            nombre: ev.target.value,
                          })
                        }
                      />
                      <button onClick={guardarEtiquetaEditada}>Guardar</button>
                    </>
                  ) : (
                    <>
                      <span>{e.nombre}</span>
                      <button onClick={() => setEditandoEtiqueta(e)}>Editar</button>
                      <button onClick={() => eliminarEtiqueta(e.id)}>Eliminar</button>
                    </>
                  )}
                </li>
              ))}
            </ul>

            <button
              className="btn-cerrar"
              onClick={() => setMostrarAdminEtiquetas(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* POPUP VER ETIQUETAS DEL PRODUCTO */}
      {/* ===================================================== */}
      {mostrarPopupEtiquetas && (
        <div className="modal">
          <div className="modal-content">
            <h2>Etiquetas de {mostrarPopupEtiquetas.nombre}</h2>

            {mostrarPopupEtiquetas.etiquetas.length === 0 ? (
              <p>Este producto no tiene ninguna etiqueta.</p>
            ) : (
              mostrarPopupEtiquetas.etiquetas.map((e) => (
                <span key={e.id} className="chip">
                  {e.nombre}
                </span>
              ))
            )}

            <button
              className="btn-cerrar"
              onClick={() => setMostrarPopupEtiquetas(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
