import React from "react";
import "../estilos/Comentarios.css";
function ComentariosList({ comentarios }) {
  if (!comentarios || comentarios.length === 0) {
    return <p>No hay comentarios aún.</p>;
  }

return (
  <div className="comentarios-list-wrapper">
    <h3 className="comentarios-titulo">Comentarios</h3> {/* 🔹 fuera del scroll */}
    <div className="comentarios-list">
      <ul>
        {comentarios.map((c, index) => {
          const iniciales = c.autor ? c.autor.charAt(0).toUpperCase() : "U";
          const fechaFormateada = c.fecha
            ? new Date(c.fecha).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "";

          return (
            <li key={index} className="comentario-item">
              {c.avatar_url ? (
                <img src={c.avatar_url} alt={c.autor} className="comentario-avatar-img" />
              ) : (
                <div className="comentario-avatar">{iniciales}</div>
              )}

              <div className="comentario-contenido">
                <div className="comentario-header">
                  <span className="comentario-autor">{c.autor}</span>
                  <span className="comentario-fecha">{fechaFormateada}</span>
                </div>
                <p className="comentario-texto">{c.texto}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

}

export default ComentariosList;