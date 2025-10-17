import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import "./HospitalPerfil.css"; // Estilos personalizados

import "../../estilos/HospitalPerfil.css";

function HospitalPerfil() {
  const { id } = useParams(); // ID del hospital en la URL
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/${id}`);
        const data = await res.json();
        setHospital(data);
      } catch (err) {
        console.error("Error al cargar hospital:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [id]);

  const hospitalLogueadoId = localStorage.getItem("hospital_id");
  const puedeEditar = hospitalLogueadoId === id;

  if (loading) return <p>Cargando hospital...</p>;
  if (!hospital) return <p>Hospital no encontrado</p>;

  return (
    <div className="hospital-perfil">
      <div className="banner">
        <img src={hospital.imagen_url} alt={hospital.nombre} />
        {puedeEditar && (
          <button
            className="editar-btn"
            onClick={() => navigate("/editar-perfil-hospital")}
          >
            ✏️ Editar perfil
          </button>
        )}
      </div>

      <div className="info-hospital">
        <h1>{hospital.nombre}</h1>
        <p>{hospital.descripcion}</p>
        <h3>Especialidades</h3>
        <div className="especialidades">
          {hospital.especialidades?.map((esp, index) => (
            <div key={index} className="card-especialidad">
              <h4>{esp.titulo}</h4>
              <p>{esp.descripcion}</p>
              <a href={esp.link} target="_blank" rel="noopener noreferrer">
                Sacar turno
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HospitalPerfil;
