import React, { useState } from "react";
import "./Publicacion.css";

export default function Publicacion() {
  // Estados para reacciones
  const [likes, setLikes] = useState(0);
  const [funny, setFunny] = useState(0);
  const [wow, setWow] = useState(0);

  // Estados para comentarios
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState("");

  // Manejo de envío de comentario
  const handleComentar = () => {
    if (comentario.trim() === "") {
      setError("El comentario no puede estar vacío");
      return;
    }
    if (comentario.length > 40) {
      setError("Máximo 40 caracteres");
      return;
    }

    setComentarios([...comentarios, comentario.trim()]);
    setComentario("");
    setError("");
  };

  return (
    <div className="post-card">
      <img
        src="https://i.imgur.com/7O3C6Jb.jpeg"
        alt="Meme"
        className="post-img"
      />
      <p className="post-text">🚀 ¡Mi primer post en Reactbook!</p>

      {/* Botones de reacciones */}
      <div className="reactions">
        <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
        <button onClick={() => setFunny(funny + 1)}>😂 {funny}</button>
        <button onClick={() => setWow(wow + 1)}>😲 {wow}</button>
      </div>

      {/* Formulario de comentarios */}
      <div className="comment-form">
        <input
          type="text"
          placeholder="Escribe un comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          maxLength={40}
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
