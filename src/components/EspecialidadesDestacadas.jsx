import React, { useEffect, useState } from "react";
import "../estilos/EspecialidadesDestacadas.css";

function EspecialidadesDestacadas() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const fetchDestacadas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/especialidades/destacadas`);
        const data = await res.json();
        setEspecialidades(data);
      } catch (err) {
        console.error("Error al cargar especialidades destacadas:", err);
      }
    };

    fetchDestacadas();
  }, []);

  return (
    <section className="especialidades-destacadas">
      <h2>🏆 Especialidades destacadas</h2>
      <div className="destacadas-grid">
  {especialidades.length > 0 ? (
    especialidades.slice(0, 8).map((esp, index) => (
      <div key={index} className="destacada-card">
        <h3>{esp.nombreEspecialidad}</h3>
        <p>{esp.nombreHospital}</p>
        <span className="rating-label">
          {esp.promedio.toFixed(1)} / 5 ({esp.cantidad} votos)
        </span>
      </div>
    ))
  ) : (
    <p>No hay especialidades destacadas aún.</p>
  )}
</div>


    </section>
  );
}

export default EspecialidadesDestacadas;
