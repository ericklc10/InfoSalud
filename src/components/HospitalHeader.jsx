import React from "react";
import "../estilos/HospitalHeader.css";
import BotonSeguir from "./BotonSeguir";

function HospitalHeader({ id, nombre, rating, reviews, seguidores, onSeguidoresChange }) {
  let hospitalLogueado = null;
  try {
    const rawHospital = localStorage.getItem("hospitalLogueado");
    hospitalLogueado = rawHospital ? JSON.parse(rawHospital) : null;
  } catch (e) {
    console.warn("⚠️ Error al parsear hospitalLogueado:", e);
  }

  const esPropioPerfil = hospitalLogueado?.id === id;
  const mostrarBotonSeguir = id && !esPropioPerfil;

  return (
    <section className="hospital-header">
      <div className="header-row">
        <div className="header-left">
          <h1 className="hospital-nombre">{nombre}</h1>
          <p className="rating">⭐ {rating} ({reviews} reseñas)</p>
          <p className="seguidores">👥 {seguidores} seguidores</p>
        </div>
        {mostrarBotonSeguir && (
          <div className="header-right">
            <BotonSeguir hospitalId={id} onSeguidoresChange={onSeguidoresChange} />
          </div>
        )}
      </div>
      <span className="divider"></span>
    </section>
  );
}

export default HospitalHeader;
