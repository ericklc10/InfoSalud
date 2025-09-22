import React from "react";
import "../estilos/EspecialidadesCard.css";
import PuntuacionEstrellas from "./PuntuacionEstrellas";

function EspecialidadesCard({ titulo, descripcion, puntuacion, urlTurno }) {
  return (
    <div className="especialidad-card">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>

      <div className="card-rating">
        <PuntuacionEstrellas valorInicial={puntuacion} />
        <span className="rating-label">{puntuacion} / 5</span>
      </div>

      <a href={urlTurno} target="_blank" rel="noopener noreferrer">
        <button className="turno-btn">Sacar turno</button>
      </a>
    </div>
  );
}

export default EspecialidadesCard;
