import React, { useState } from "react";
import "../estilos/BannerHospital.css";



function BannerHospital({ imagenUrl, nombre }) {
  const [error, setError] = useState(false);
  const imagenFinal = !error && imagenUrl ? imagenUrl : "/default-banner.jpg";

  return (
    <section className="hospital-banner">
      <img
        src={imagenFinal}
        alt={`Banner de ${nombre}`}
        className="banner-img"
        onError={() => setError(true)}
      />
      <div className="banner-overlay" />
      {/* <h1 className="banner-titulo">{nombre}</h1> */}
    </section>
  );
}

export default BannerHospital;
