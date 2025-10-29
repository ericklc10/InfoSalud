import React from "react";
import "../estilos/PuntuacionEstrellas.css";

function PuntuacionEstrellas({ puntuacion, onChange }) {
  const [hover, setHover] = React.useState(0);

  const manejarClick = (valor) => {
    if (onChange) onChange(valor);
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
      {puntuacion > 0 && <span className="valor">{puntuacion} / 5</span>}
    </div>
  );
}

export default PuntuacionEstrellas;
