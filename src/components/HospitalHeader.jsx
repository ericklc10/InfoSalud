import React from "react";
import "../estilos/HospitalHeader.css";
import BotonSeguir from "./BotonSeguir";

function HospitalHeader({ id, nombre, descripcion, rating, reviews, especialidades }) {
  const resumenEspecialidades = Array.isArray(especialidades)
    ? especialidades.map((e) => e.titulo || e.nombre).join(", ")
    : null;

  let hospitalLogueado = null;
  try {
    const rawHospital = localStorage.getItem("hospitalLogueado");
    hospitalLogueado = rawHospital ? JSON.parse(rawHospital) : null;
  } catch (e) {
    console.warn("⚠️ Error al parsear hospitalLogueado:", e);
  }

  const esPropioPerfil = hospitalLogueado?.id === id;

  // Validación defensiva: solo renderizar el botón si el ID es válido
  const mostrarBotonSeguir = id && !esPropioPerfil;

  return (
    <section className="hospital-header">
      <div className="header-top">
        <h1 className="hospital-nombre">{nombre}</h1>
        {mostrarBotonSeguir && <BotonSeguir hospitalId={id} />}
      </div>

      <p>{descripcion}</p>
      <p className="rating">
        {rating} ⭐ ({reviews} reseñas)
      </p>

      {resumenEspecialidades && (
        <p className="especialidades-resumen">
          <strong>Especialidades:</strong> {resumenEspecialidades}
        </p>
      )}

      <span className="divider"></span>
    </section>
  );
}

export default HospitalHeader;
