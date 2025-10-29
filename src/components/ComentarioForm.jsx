import React, { useState } from "react";
import "../estilos/Comentarios.css";
import PuntuacionEstrellas from "./PuntuacionEstrellas";

function ComentarioForm({ hospitalId, usuarioNombre, onComentarioAgregado }) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  let usuarioLogueado = null;
  let hospitalLogueado = null;

  try {
    const rawUsuario = localStorage.getItem("usuario");
    const rawHospital = localStorage.getItem("hospitalLogueado");

    usuarioLogueado = rawUsuario ? JSON.parse(rawUsuario) : null;
    hospitalLogueado = rawHospital ? JSON.parse(rawHospital) : null;

    // 👇 Agregá este log para ver qué trae
  console.log("Usuario logueado:", usuarioLogueado);

  } catch (e) {
    console.warn("⚠️ Error al parsear sesión:", e);
  }

  // 🚫 Bloqueamos a hospitales
  // if (hospitalLogueado) {
  //   return (
  //     <p className="comentario-bloqueado">
  //       ⚠️ Los hospitales no pueden comentar en su propio perfil.
  //     </p>
  //   );
  // }

  if (!usuarioLogueado) {
    return (
      <p className="comentario-bloqueado">
        ⚠️ Iniciá sesión como usuario para dejar un comentario.
      </p>
    );
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
  usuarioId: usuarioLogueado.id // ✅ el backend usará esto para buscar url_imagen
})

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