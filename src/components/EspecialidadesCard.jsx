import React, { useState, useEffect } from "react";
import "../estilos/EspecialidadesCard.css";
import PuntuacionEstrellas from "./PuntuacionEstrellas";

function EspecialidadesCard({
  hospitalId,
  espKey,
  titulo,
  descripcion,
  promedioInicial,
  urlTurno,
  usuarioId,
  puedePuntuar,
}) {
  const [promedio, setPromedio] = useState(promedioInicial || 0);
  const [cantidad, setCantidad] = useState(0);
  const [puntuacionUsuario, setPuntuacionUsuario] = useState(null);

  useEffect(() => {
    const fetchPromedio = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/especialidad/${espKey}/promedio`
        );
        const data = await res.json();
        if (data) {
          setPromedio(data.promedio || 0);
          setCantidad(data.cantidad || 0);
        }
      } catch (err) {
        console.error("Error al obtener promedio:", err);
      }
    };

    const fetchPuntuacionUsuario = async () => {
      if (!usuarioId) return; // si no hay usuario logueado, no buscar
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/especialidad/${espKey}/puntuacion-usuario/${usuarioId}`
        );
        const data = await res.json();
        if (data && data.puntuacion) {
          setPuntuacionUsuario(data.puntuacion);
        }
      } catch (err) {
        console.error("Error al obtener puntuación del usuario:", err);
      }
    };

    fetchPromedio();
    fetchPuntuacionUsuario();
  }, [hospitalId, espKey, usuarioId]);

  const handlePuntuar = async (valor) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/especialidad/${espKey}/puntuacion`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuarioId, puntuacion: valor }),
        }
      );

      const data = await res.json();
      setPromedio(data.promedio);
      setPuntuacionUsuario(valor);
    } catch (err) {
      console.error("Error al puntuar especialidad:", err);
    }
  };

  return (
    <div className="especialidad-card">
      <h3>
        {titulo}{" "}
        <span className="rating-label">
          {promedio ? promedio.toFixed(1) : "N/A"} / 5 ({cantidad} votos)
        </span>
      </h3>
      <p>{descripcion}</p>

      <div className="card-rating">
        {puedePuntuar ? (
          <PuntuacionEstrellas
            puntuacion={puntuacionUsuario || 0}
            onChange={handlePuntuar}
          />
        ) : (
          <span className="comentario-bloqueado">
            ⚠️ Solo los usuarios logueados pueden puntuar especialidades
          </span>
        )}
      </div>

      {urlTurno && (
        <a href={urlTurno} target="_blank" rel="noopener noreferrer">
          <button className="turno-btn">Sacar turno</button>
        </a>
      )}
    </div>
  );
}

export default EspecialidadesCard;
