import React, { useState } from "react";
import "./styles/Registro.css";
import regiones from "./regiones";

export default function Registro() {
  const [pyme, setPyme] = useState({
    nombre: "",
    rut: "",
    giro: "",
    direccion: "",
    region: "",
    comuna: "",
    telefono: "",
    correo: "",
    iva: "",
    impuesto_interno: "",
    retencion: "",
  });

  const [admin, setAdmin] = useState({
    nombre: "",
    correo: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePymeChange = (e) => {
    const { name, value } = e.target;
    setPyme((p) => ({ ...p, [name]: value }));

    // Si cambia región → reinicio comuna
    if (name === "region") {
      setPyme((p) => ({ ...p, comuna: "" }));
    }
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdmin((a) => ({ ...a, [name]: value }));
  };

  // Limpieza RUT
  const cleanRut = (rut) => rut.replace(/[^0-9kK]/g, "").toUpperCase();

  // Validación Rut
  const validateRut = (rut) => {
    rut = cleanRut(rut);
    if (rut.length < 8) return false;

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);

    let suma = 0;
    let m = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += m * parseInt(cuerpo[i]);
      m = m === 7 ? 2 : m + 1;
    }

    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : `${resto}`;

    return dvEsperado === dv;
  };

  // Validación email
  const validateEmail = (email) =>
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  const validate = () => {
    const e = {};

    if (!pyme.nombre) e.pyme_nombre = "Campo obligatorio";
    if (!pyme.rut) e.pyme_rut = "Campo obligatorio";
    else if (!validateRut(pyme.rut)) e.pyme_rut = "RUT inválido";

    if (!pyme.giro) e.pyme_giro = "Campo obligatorio";
    if (!pyme.direccion) e.pyme_direccion = "Campo obligatorio";
    if (!pyme.region) e.pyme_region = "Campo obligatorio";
    if (!pyme.comuna) e.pyme_comuna = "Campo obligatorio";

    if (!pyme.telefono) e.pyme_telefono = "Campo obligatorio";

    if (!pyme.correo) e.pyme_correo = "Campo obligatorio";
    else if (!validateEmail(pyme.correo)) e.pyme_correo = "Correo inválido";

    ["iva", "impuesto_interno", "retencion"].forEach((k) => {
      if (pyme[k] && isNaN(Number(pyme[k]))) {
        e[`pyme_${k}`] = "Debe ser número";
      }
    });

    if (!admin.nombre) e.admin_nombre = "Campo obligatorio";
    if (!admin.correo) e.admin_correo = "Campo obligatorio";
    else if (!validateEmail(admin.correo)) e.admin_correo = "Correo inválido";

    if (!admin.password) e.admin_password = "Campo obligatorio";
    if (admin.password.length < 6)
      e.admin_password = "Mínimo 6 caracteres";

    if (!admin.password2) e.admin_password2 = "Campo obligatorio";
    if (admin.password !== admin.password2)
      e.admin_password2 = "No coinciden";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validate()) return;

    setSubmitting(true);

    const payload = {
      nombre_admin: admin.nombre,
      correo_admin: admin.correo,
      password: admin.password,
      password2: admin.password2,
      nombre: pyme.nombre,
      rut: pyme.rut,
      giro: pyme.giro,
      direccion: pyme.direccion,
      región: pyme.region,
      comuna: pyme.comuna,
      telefono: pyme.telefono,
      correo: pyme.correo,
      iva: pyme.iva,
      impuesto_interno: pyme.impuesto_interno,
      retencion: pyme.retencion,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/pymes/registrarpyme/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error en el registro");

      setSuccessMessage("Registro exitoso");

      setAdmin({ nombre: "", correo: "", password: "", password2: "" });
    } catch (err) {
      setErrors({ submit: "Error al enviar" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registro-container">
      <h1 className="titulo">Registro de Pyme y Administrador</h1>

      <form onSubmit={handleSubmit} className="formulario">
        {/* PYME */}
        <section>
          <h2 className="subtitulo">Datos de la Pyme</h2>

          <div className="grid">
            {/* Nombre */}
            <div>
              <label>Nombre</label>
              <input
                name="nombre"
                value={pyme.nombre}
                onChange={handlePymeChange}
              />
              {errors.pyme_nombre && <p className="error">{errors.pyme_nombre}</p>}
            </div>

            {/* RUT */}
            <div>
              <label>RUT</label>
              <input
                name="rut"
                value={pyme.rut}
                onChange={handlePymeChange}
              />
              {errors.pyme_rut && <p className="error">{errors.pyme_rut}</p>}
            </div>

            {/* Giro */}
            <div>
              <label>Giro</label>
              <input
                name="giro"
                value={pyme.giro}
                onChange={handlePymeChange}
              />
              {errors.pyme_giro && <p className="error">{errors.pyme_giro}</p>}
            </div>

            {/* Dirección */}
            <div>
              <label>Dirección</label>
              <input
                name="direccion"
                value={pyme.direccion}
                onChange={handlePymeChange}
              />
              {errors.pyme_direccion && (
                <p className="error">{errors.pyme_direccion}</p>
              )}
            </div>

            {/* Región */}
            <div>
              <label>Región</label>
              <select
                name="region"
                value={pyme.region}
                onChange={handlePymeChange}
              >
                <option value="">Selecciona región</option>
                {regiones.map((r) => (
                  <option key={r.region} value={r.region}>
                    {r.region}
                  </option>
                ))}
              </select>
              {errors.pyme_region && <p className="error">{errors.pyme_region}</p>}
            </div>

            {/* Comuna */}
            <div>
              <label>Comuna</label>
              <select
                name="comuna"
                value={pyme.comuna}
                onChange={handlePymeChange}
                disabled={!pyme.region}
              >
                <option value="">Selecciona comuna</option>
                {regiones
                  .find((r) => r.region === pyme.region)
                  ?.comunas.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
              {errors.pyme_comuna && <p className="error">{errors.pyme_comuna}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label>Teléfono</label>
              <div className="telefono-box">
                <span className="flag">🇨🇱</span>
                <span className="prefijo">+56</span>
                <input
                  name="telefono"
                  value={pyme.telefono}
                  onChange={handlePymeChange}
                  placeholder="912345678"
                />
              </div>
              {errors.pyme_telefono && (
                <p className="error">{errors.pyme_telefono}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label>Correo</label>
              <input name="correo" value={pyme.correo} onChange={handlePymeChange} />
              {errors.pyme_correo && <p className="error">{errors.pyme_correo}</p>}
            </div>

            {/* IVA */}
            <div>
              <label>IVA</label>
              <input name="iva" value={pyme.iva} onChange={handlePymeChange} />
              {errors.pyme_iva && <p className="error">{errors.pyme_iva}</p>}
            </div>

            {/* Impuesto interno */}
            <div>
              <label>Impuesto interno</label>
              <input
                name="impuesto_interno"
                value={pyme.impuesto_interno}
                onChange={handlePymeChange}
              />
              {errors.pyme_impuesto_interno && (
                <p className="error">{errors.pyme_impuesto_interno}</p>
              )}
            </div>

            {/* Retención */}
            <div>
              <label>Retención (%)</label>
              <input
                name="retencion"
                value={pyme.retencion}
                onChange={handlePymeChange}
              />
              {errors.pyme_retencion && (
                <p className="error">{errors.pyme_retencion}</p>
              )}
            </div>
          </div>
        </section>

        {/* ADMIN */}
        <section>
          <h2 className="subtitulo">Datos del Administrador</h2>
          <div className="grid">
            <div>
              <label>Nombre</label>
              <input
                name="nombre"
                value={admin.nombre}
                onChange={handleAdminChange}
              />
              {errors.admin_nombre && <p className="error">{errors.admin_nombre}</p>}
            </div>

            <div>
              <label>Correo</label>
              <input
                name="correo"
                value={admin.correo}
                onChange={handleAdminChange}
              />
              {errors.admin_correo && <p className="error">{errors.admin_correo}</p>}
            </div>

            <div>
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleAdminChange}
              />
              {errors.admin_password && <p className="error">{errors.admin_password}</p>}
            </div>

            <div>
              <label>Repetir contraseña</label>
              <input
                type="password"
                name="password2"
                value={admin.password2}
                onChange={handleAdminChange}
              />
              {errors.admin_password2 && (
                <p className="error">{errors.admin_password2}</p>
              )}
            </div>
          </div>
        </section>

        {errors.submit && <p className="error">{errors.submit}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className="botones">
          <button className="btn azul" type="submit" disabled={submitting}>
            {submitting ? "Enviando..." : "Registrar Pyme"}
          </button>
        </div>
      </form>
    </div>
  );
}
