import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function HospitalPublico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/${id}`);
        const data = await res.json();

        if (!res.ok || data.message === "Hospital no encontrado") {
          navigate(`/editar-perfil-hospital/${id}`);
          return;
        }

        // Si el hospital existe pero no tiene perfil completo
        const perfilIncompleto =
          !data.descripcion || !data.especialidades?.length || !data.imagen_url;

        if (perfilIncompleto) {
          navigate(`/editar-perfil-hospital/${id}`);
          return;
        }

        setHospital(data);
      } catch (err) {
        console.error("Error al cargar hospital:", err);
        navigate(`/editar-perfil-hospital/${id}`);
      }
    };

    fetchHospital();
  }, [id, navigate]);

  if (!hospital) return <p>Cargando hospital...</p>;

  return (
    <div className="hospital-publico">
      <h2>{hospital.nombre}</h2>
      <p>{hospital.descripcion}</p>
      <p>Especialidades: {hospital.especialidades.join(", ")}</p>
      {hospital.imagen_url && <img src={hospital.imagen_url} alt="Portada" />}
    </div>
  );
}

export default HospitalPublico;
