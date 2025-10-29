import React from "react";
import "../estilos/Comentarios.css";

function ComentariosList({ comentarios }) {
  if (!comentarios || comentarios.length === 0) {
    return <p>No hay comentarios aún.</p>;
  }

  return (
    <div className="comentarios-list">
      <h3>Comentarios</h3>
      <ul>
        {comentarios.map((c, index) => (
          <li key={index} className="comentario-item">
            <strong>{c.autor}</strong>: {c.texto}
            <br />
            <small>{c.fecha}</small>
            {c.puntuacion && (
              <div className="estrellas-comentario">
                {Array.from({ length: c.puntuacion }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
                <span className="puntuacion-label">({c.puntuacion}/5)</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComentariosList;
