import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function HospitalPublico() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/${id}`);
      const data = await res.json();

      if (!res.ok || data.message === "Hospital no encontrado") {
        setHospital(null);
      } else {
        setHospital(data);
      }
    };

    fetchHospital();
  }, [id]);

  if (!hospital) return <p>Hospital no encontrado</p>;

  return (
    <div className="hospital-publico">
      <h2>{hospital.nombre}</h2>
      <p>{hospital.descripcion}</p>
      <p>Especialidades: {hospital.especialidades?.join(", ")}</p>
    </div>
  );
}

export default HospitalPublico;
