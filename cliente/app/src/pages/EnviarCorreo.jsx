import { useState } from "react";

export default function EnviarCorreo() {
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [respuesta, setRespuesta] = useState(null);
  const [cargando, setCargando] = useState(false);

  const enviarCorreo = async (e) => {
    e.preventDefault();
    setCargando(true);
    setRespuesta(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/test-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asunto,
          mensaje,
          destinatario,
        }),
      });

      const data = await res.json();
      setRespuesta(data);

    } catch (error) {
      setRespuesta({ error: "No se pudo conectar al servidor" });
    }

    setCargando(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enviar correo de prueba</h1>

      <form onSubmit={enviarCorreo} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Asunto</label>
          <input
            className="w-full border p-2 rounded"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mensaje</label>
          <textarea
            className="w-full border p-2 rounded h-32"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Destinatario</label>
          <input
            className="w-full border p-2 rounded"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={cargando}
        >
          {cargando ? "Enviando..." : "Enviar correo"}
        </button>
      </form>

      {respuesta && (
        <div
          className={`mt-4 p-3 rounded ${
            respuesta.error ? "bg-red-200" : "bg-green-200"
          }`}
        >
          {respuesta.error ? respuesta.error : respuesta.mensaje}
        </div>
      )}
    </div>
  );
}
