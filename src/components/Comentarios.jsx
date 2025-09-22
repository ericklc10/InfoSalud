import React, { useState } from "react";

import "../estilos/Comentarios.css";

function Comentarios() {
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState("");

  const handleComentar = () => {
    if (comentario.trim() === "") {
      setError("El comentario no puede estar vacío");
      return;
    }
    setComentarios([comentario, ...comentarios]);
    setComentario("");
    setError("");
  };

  return (
    <div className="comentarios-container">
      {/* Formulario */}
      <div className="comment-form">
        <input
          type="text"
          placeholder="Escribe un comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          maxLength={100}
        />
        <button onClick={handleComentar}>Comentar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Lista de comentarios */}
      <div className="comments">
        {comentarios.length === 0 ? (
          <p className="no-comments">Sé el primero en comentar 😎</p>
        ) : (
          comentarios.map((c, i) => (
            <p key={i} className="comment">
              💬 {c}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default Comentarios;
