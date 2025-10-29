import React, { useState } from "react";
import "../estilos/Comentarios.css";
import PuntuacionEstrellas from "./PuntuacionEstrellas";

function ComentarioForm({ hospitalId, usuarioNombre, onComentarioAgregado }) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  let sesionActiva = null;

  try {
    const rawUsuario = localStorage.getItem("usuario");
    const rawHospital = localStorage.getItem("hospitalLogueado");

    const usuarioLogueado = rawUsuario ? JSON.parse(rawUsuario) : null;
    const hospitalLogueado = rawHospital ? JSON.parse(rawHospital) : null;

    sesionActiva = usuarioLogueado || hospitalLogueado;
  } catch (e) {
    console.warn("⚠️ Error al parsear sesión:", e);
  }

  const handleEnviar = async () => {
    setError(null);

    if (!texto.trim()) {
      setError("⚠️ El comentario no puede estar vacío.");
      return;
    }

    setEnviando(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/comentarios`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            autor: usuarioNombre,
            texto,
            fecha: new Date().toISOString(),
            puntuacion: null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al enviar comentario");

      onComentarioAgregado(data.comentarios);
      setTexto("");
    } catch (err) {
      console.error("❌ Error al enviar comentario:", err);
      setError("No se pudo enviar el comentario.");
    } finally {
      setEnviando(false);
    }
  };

  if (!sesionActiva) {
    return (
      <p className="comentario-bloqueado">
        ⚠️ Iniciá sesión para dejar un comentario.
      </p>
    );
  }

  return (
    <div className="comentario-form">
      <h3>Escribir un comentario</h3>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe tu comentario..."
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleEnviar} disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
}

export default ComentarioForm;