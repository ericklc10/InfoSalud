import React from "react";
import "../estilos/HospitalHeader.css";
import BotonSeguir from "./BotonSeguir";

function HospitalHeader({ nombre, descripcion, rating, reviews }) {
  return (
    <section className="hospital-header">
      <div className="header-top">
        <h1 className="hospital-nombre">{nombre}</h1>
        <BotonSeguir hospitalId={nombre} />
      </div>

      <p>{descripcion}</p>
      <p className="rating">
        {rating} ⭐ ({reviews} reseñas)
      </p>
      <span className="divider"></span>
    </section>
  );
}

export default HospitalHeader;
