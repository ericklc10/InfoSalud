import React, { useState } from "react";
import "../estilos/PuntuacionEstrellas.css"; // Opcional para estilos

function PuntuacionEstrellas({ onChange }) {
  const [puntuacion, setPuntuacion] = useState(0);
  const [hover, setHover] = useState(0);

  const manejarClick = (valor) => {
    setPuntuacion(valor);
    if (onChange) onChange(valor); // Para enviar el valor al padre si lo necesitas
  };

  return (
    <div className="puntuacion-estrellas">
      {[1, 2, 3, 4, 5].map((estrella) => (
        <span
          key={estrella}
          className={
            estrella <= (hover || puntuacion) ? "estrella activa" : "estrella"
          }
          onClick={() => manejarClick(estrella)}
          onMouseEnter={() => setHover(estrella)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
      {puntuacion > 0 && <span className="valor"> {puntuacion} / 5</span>}
    </div>
  );
}

export default PuntuacionEstrellas;
