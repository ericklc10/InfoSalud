import React, { useState } from "react";
import "../estilos/Comentarios.css";
import PuntuacionEstrellas from "./PuntuacionEstrellas";

function ComentarioForm({ onAgregarComentario }) {
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [puntuacion, setPuntuacion] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (autor.trim() && texto.trim()) {
      onAgregarComentario(autor, texto, puntuacion);
      setAutor("");
      setTexto("");
      setPuntuacion(5);
    }
  };

  return (
    <form className="comentario-form" onSubmit={handleSubmit}>
      <h3>Escribir un comentario</h3>

      <input
        type="text"
        placeholder="Tu nombre"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        required
      />

      <textarea
        placeholder="Escribe tu comentario..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        required
      ></textarea>

      <div className="form-rating">
        <label>Puntuación:</label>
        <PuntuacionEstrellas valorInicial={puntuacion} onChange={setPuntuacion} />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default ComentarioForm;
