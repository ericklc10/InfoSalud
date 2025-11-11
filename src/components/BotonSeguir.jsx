import React, { useState, useEffect } from "react";
import "../estilos/BotonSeguir.css";

function BotonSeguir({ hospitalId, onSeguidoresChange }) {
  const [siguiendo, setSiguiendo] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Obtener usuario logueado desde localStorage
  useEffect(() => {
    try {
      const rawUsuario = localStorage.getItem("usuario");
      const usuario = rawUsuario ? JSON.parse(rawUsuario) : null;
      if (usuario?.id) setUsuarioId(usuario.id);
    } catch (e) {
      console.warn("⚠️ Error al leer usuario:", e);
    }
  }, []);

  // Verificar si ya sigue el hospital
  useEffect(() => {
    const verificar = async () => {
      if (!usuarioId || !hospitalId) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/seguimiento?usuario_id=${usuarioId}`
        );
        const data = await res.json();
        setSiguiendo(data.siguiendo);
      } catch (err) {
        console.error("❌ Error al verificar seguimiento:", err);
      }
    };

    verificar();
  }, [usuarioId, hospitalId]);

  const handleClick = async () => {
    if (!usuarioId || !hospitalId || typeof hospitalId !== "string") {
      setMensaje("ID inválido. No se puede seguir este hospital.");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      const url = `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/seguir`;

      const options = {
        method: siguiendo ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: usuarioId }),
      };

      const res = await fetch(url, options);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Respuesta inválida del servidor");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar seguimiento");

      // Actualizamos estado local
      setSiguiendo(!siguiendo);
      setMensaje(data.message || "");

      // 👇 Actualizamos contador en el padre
      if (onSeguidoresChange) {
        onSeguidoresChange(siguiendo ? -1 : +1);
      }
    } catch (err) {
      console.error("❌ Error al seguir/dejar de seguir:", err);
      setMensaje("No se pudo actualizar el seguimiento.");
    } finally {
      setLoading(false);
    }
  };

  if (!usuarioId) return null;

  return (
    <div className="boton-seguir-wrapper">
      <button
        className={`boton-seguir ${siguiendo ? "activo" : ""}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Procesando..." : siguiendo ? "Siguiendo" : "Seguir"}
      </button>
      
    </div>
  );
}

export default BotonSeguir;
