import React from "react";
import "../estilos/HospitalHeader.css";


function HospitalHeader({ nombre, descripcion, rating, reviews }) {
  return (
    <section className="hospital-header">
      <h1>{nombre}</h1>
      <p>{descripcion}</p>
      <p className="rating">
        {rating} ⭐ ({reviews} reseñas)
      </p>
      <span className="divider"></span>
    </section>
  );
}

export default HospitalHeader;
