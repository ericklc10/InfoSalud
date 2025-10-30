// src/components/HospitalesTodos.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";   // 👈 Importar Link
import "../estilos/HospitalesTodos.css";

function HospitalesTodos() {
  const [hospitales, setHospitales] = useState([]);
  const [pagina, setPagina] = useState(1);
  const hospitalesPorPagina = 10;

  useEffect(() => {
    const fetchHospitales = async () => {
      try {
        const res = await fetch("http://localhost:4000/hospital"); // tu backend
        if (!res.ok) throw new Error("Error al cargar hospitales");
        const data = await res.json();
        setHospitales(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHospitales();
  }, []);

  const inicio = (pagina - 1) * hospitalesPorPagina;
  const fin = inicio + hospitalesPorPagina;
  const hospitalesPagina = hospitales.slice(inicio, fin);

  const totalPaginas = Math.ceil(hospitales.length / hospitalesPorPagina);

  return (
    <div className="hospitales-todos">
      <h2>Todos los hospitales</h2>
      <ul className="lista-hospitales">
        {hospitalesPagina.map((hosp) => (
          <li key={hosp.id} className="hospital-item">
            {/* 👇 Cada hospital es un Link */}
            <Link to={`/hospitales-general/${hosp.id}`} className="hospital-link">


              <img src={hosp.imagen_url} alt={hosp.nombre} className="hospital-thumb" />
              <span>{hosp.nombre}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="paginacion">
        <button
          disabled={pagina === 1}
          onClick={() => setPagina((p) => p - 1)}
        >
          ◀ Anterior
        </button>
        <span>Página {pagina} de {totalPaginas}</span>
        <button
          disabled={pagina === totalPaginas}
          onClick={() => setPagina((p) => p + 1)}
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
}

export default HospitalesTodos;
