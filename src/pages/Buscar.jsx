import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../estilos/Buscador.css";

function useQueryParam() {
  const search = useLocation().search;
  return new URLSearchParams(search);
}

function Buscar() {
  const q = useQueryParam().get("query") || "";
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const buscar = async () => {
      if (!q.trim()) {
        setResultados([]);
        return;
      }
      setCargando(true);
      setError("");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/hospital/buscar?query=${encodeURIComponent(q)}`
        );
        if (!res.ok) throw new Error(`Estado ${res.status}`);
        const data = await res.json();
        const adaptados = (Array.isArray(data) ? data : []).map(h => ({
          id: h.id,
          nombre: h.nombre,
          imagen_url: h.imagen_url || "/default-banner.jpg",
        }));
        setResultados(adaptados);
      } catch (e) {
        console.error("❌ Error en búsqueda:", e);
        setError("Hubo un problema al realizar la búsqueda.");
        setResultados([]);
      } finally {
        setCargando(false);
      }
    };

    buscar();
  }, [q]);

  return (
    <div className="buscar-container">
      <h2>Resultados para: “{q}”</h2>

      {cargando && <p className="buscar-empty">Buscando...</p>}
      {!cargando && error && <p className="buscar-empty">{error}</p>}
      {!cargando && !error && resultados.length === 0 && q.trim() && (
        <p className="buscar-empty">No se pudo encontrar “{q}” hospital.</p>
      )}

      {!cargando && !error && resultados.length > 0 && (
        <ul className="buscar-lista">
          {resultados.map(h => (
            <li key={h.id} className="buscar-item">
              <Link to={`/hospitales/${h.id}`} className="buscar-link">
                <img src={h.imagen_url} alt={h.nombre} />
                <span>{h.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Buscar;
