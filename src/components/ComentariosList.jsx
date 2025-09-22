import React from "react";
import "../estilos/comentarios.css";

function ComentariosList({ comentarios }) {
  return (
    <section className="comentarios-list">
      <h2>Comentarios</h2>
      {comentarios.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        comentarios.map((comentario, index) => (
          <div key={index} className="comentario">
            <strong>{comentario.autor}:</strong>
            <p>{comentario.texto}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default ComentariosList;
