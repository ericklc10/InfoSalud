import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../estilos/Home.css";

function Hospitales_cards() {
  const [hospitales, setHospitales] = useState([]);

  useEffect(() => {
    const fetchHospitales = async () => {
      try {
        // Consumimos el nuevo endpoint de destacados
        const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/destacados`);

        const data = await res.json();

        const hospitales = Array.isArray(data) ? data : [];

        const adaptados = hospitales
          .filter(h => h.id && h.nombre)
          .map(h => ({
            id: h.id,
            nombre: h.nombre,
            imagen_url: h.imagen_url || "/default-banner.jpg",
            promedio: h.promedio || 0
          }));

        setHospitales(adaptados);
      } catch (err) {
        console.error("❌ Error al cargar hospitales destacados:", err);
      }
    };

    fetchHospitales();
  }, []);

  return (
    <section className="hospitales">
      <h2>🏥 Hospitales Destacados</h2>
      <div className="cards">
        {hospitales.length === 0 ? (
          <p>No se encontraron hospitales destacados.</p>
        ) : (
          hospitales.map((hospital) => (
            <Link
              key={hospital.id}
              to={`/hospitales/${hospital.id}`}
              className="card"
            >
              <img
                src={hospital.imagen_url}
                alt={hospital.nombre}
              />
              <h3>{hospital.nombre}</h3>
              <p>⭐ {hospital.promedio.toFixed(1)}</p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default Hospitales_cards;
