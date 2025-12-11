import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./styles/Cotizaciones.css";

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [user, setUser] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarDetalle, setMostrarDetalle] = useState(null);

  const [form, setForm] = useState({
    cliente: "",
    items: [{ producto: "", cantidad: 1 }],
    descuento: 0,
    impuestos: 0,
    vendedor: null,
  });

  // =============================
  // CARGA INICIAL
  // =============================
  useEffect(() => {
    cargarCotizaciones();
    api.get("clientes/").then((r) => setClientes(r.data));
    api.get("productos/").then((r) => setProductos(r.data));

    // Obtener usuario desde token
    api.get("auth/user/").then((r) => {
      setUser(r.data);
      setForm((f) => ({ ...f, vendedor: r.data.id_usuario }));
    });
  }, []);

  const cargarCotizaciones = () => {
    api.get("cotizaciones/").then((res) => setCotizaciones(res.data));
  };

  // =============================
  // MANEJO DE ITEMS
  // =============================
  const handleItemChange = (i, campo, valor) => {
    const nuevos = [...form.items];
    nuevos[i][campo] = valor;
    setForm({ ...form, items: nuevos });
  };

  const agregarItem = () => {
    setForm({
      ...form,
      items: [...form.items, { producto: "", cantidad: 1 }],
    });
  };

  const quitarItem = (i) => {
    setForm({
      ...form,
      items: form.items.filter((_, idx) => idx !== i),
    });
  };

  // =============================
  // CREAR COTIZACIÓN
  // =============================
  const crearCotizacion = (e) => {
    e.preventDefault();

    const payload = { ...form, vendedor: user?.id_usuario };

    api
      .post("cotizaciones/", payload)
      .then(() => {
        setForm({
          cliente: "",
          items: [{ producto: "", cantidad: 1 }],
          descuento: 0,
          impuestos: 0,
          vendedor: user?.id_usuario,
        });
        setMostrarForm(false);
        cargarCotizaciones();
      })
      .catch(console.error);
  };

  // =============================
  // CAMBIAR ESTADO
  // =============================
  const cambiarEstado = (id, estado) => {
    api
      .patch(`cotizaciones/${id}/`, { estado })
      .then(cargarCotizaciones)
      .catch(console.error);
  };

  // =============================
  // DESCARGAR PDF
  // =============================
  const descargarPDF = (id) => {
    api
      .get(`cotizaciones/${id}/pdf/`, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `cotizacion_${id}.pdf`;
        a.click();
      })
      .catch(console.error);
  };

  // =============================
  // DETALLE
  // =============================
  const abrirDetalle = (cot) => {
    setMostrarDetalle(cot);
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>Cotizaciones</h1>

        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="boton-agregar"
        >
          {mostrarForm ? "Cancelar" : "Nueva Cotización"}
        </button>

        {mostrarForm && (
          <form className="form-cotizacion" onSubmit={crearCotizacion}>
            <h3>Crear Cotización</h3>

            {/* Cliente */}
            <label>Cliente</label>
            <select
              value={form.cliente}
              onChange={(e) => setForm({ ...form, cliente: e.target.value })}
              required
            >
              <option value="">Selecciona un cliente...</option>
              {clientes.map((c) => (
                <option key={c.id_cliente} value={c.id_cliente}>
                  {c.nombre}
                </option>
              ))}
            </select>

            {/* Vendedor */}
            <div className="campo-vendedor">
              <label>Vendedor asignado</label>
              <p className="vendedor-asignado">
                <strong>{user?.nombre}</strong>
              </p>
            </div>

            <hr />

            <h4>Ítems de la cotización</h4>

            {form.items.map((item, i) => (
              <div key={i} className="item-cotizacion">
                <div className="campo">
                  <label>Producto</label>
                  <select
                    value={item.producto}
                    onChange={(e) => handleItemChange(i, "producto", e.target.value)}
                    required
                  >
                    <option value="">Selecciona...</option>
                    {productos.map((p) => (
                      <option key={p.id_producto} value={p.id_producto}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="campo">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => handleItemChange(i, "cantidad", e.target.value)}
                  />
                </div>

                {form.items.length > 1 && (
                  <button type="button" className="btn-quitar" onClick={() => quitarItem(i)}>
                    X
                  </button>
                )}
              </div>
            ))}

            <button type="button" className="btn-agregar" onClick={agregarItem}>
              + Añadir Ítem
            </button>

            <hr />

            <label>Descuento</label>
            <input
              type="number"
              step="0.01"
              placeholder="0"
              value={form.descuento}
              onChange={(e) => setForm({ ...form, descuento: e.target.value })}
            />

            <label>Impuestos</label>
            <input
              type="number"
              step="0.01"
              placeholder="0"
              value={form.impuestos}
              onChange={(e) => setForm({ ...form, impuestos: e.target.value })}
            />

            <button type="submit" className="btn-guardar">
              Guardar Cotización
            </button>
          </form>
        )}

        {/* Tabla */}
        <table className="tabla-cotizaciones">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {cotizaciones.map((c) => (
              <tr key={c.id_cotizacion}>
                <td>{c.id_cotizacion}</td>
                <td>{c.cliente_nombre ?? c.cliente}</td>
                <td>{c.vendedor_nombre ?? c.vendedor}</td>
                <td>{c.fecha_formateada}</td>
                <td>${c.total}</td>
                <td>{c.estado}</td>
                <td className="acciones">
                  <button onClick={() => abrirDetalle(c)}>Ver</button>
                  <button onClick={() => cambiarEstado(c.id_cotizacion, "Aprobada")}>
                    Aprobar
                  </button>
                  <button onClick={() => cambiarEstado(c.id_cotizacion, "Rechazada")}>
                    Rechazar
                  </button>
                  <button onClick={() => descargarPDF(c.id_cotizacion)}>
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Detalle */}
        {mostrarDetalle && (
          <div className="modal">
            <div className="modal-content">
              <h2>Cotización #{mostrarDetalle.id_cotizacion}</h2>
              <p><strong>Cliente:</strong> {mostrarDetalle.cliente_nombre}</p>
              <p><strong>Vendedor:</strong> {mostrarDetalle.vendedor_nombre}</p>
              <p><strong>Fecha:</strong> {mostrarDetalle.fecha_formateada}</p>

              <p><strong>Descuento:</strong> {mostrarDetalle.descuento}%</p>
              <p><strong>Impuestos:</strong> {mostrarDetalle.impuestos}%</p>

              <h3>Ítems</h3>
              <ul>
                {mostrarDetalle.items?.map((it, i) => (
                  <li key={i}>
                    {it.producto_nombre} — {it.cantidad} x ${it.subtotal}
                  </li>
                ))}
              </ul>

              <hr />

              <p><strong>Total Final:</strong> ${mostrarDetalle.total}</p>

              <button onClick={() => setMostrarDetalle(null)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
