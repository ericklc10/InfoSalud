import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HospitalHeader from "../../components/HospitalHeader";
import EspecialidadesCard from "../../components/EspecialidadesCard";
import ComentariosList from "../../components/ComentariosList";
import ComentarioForm from "../../components/ComentarioForm";

function HospitalPublico() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const fetchHospital = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/hospitales/${id}`);
      const data = await res.json();
      setHospital(data);
    };

    fetchHospital();
  }, [id]);

  if (!hospital) return <p>Cargando hospital...</p>;

  return (
    <main className="hospital-page">
      <HospitalHeader
        nombre={hospital.nombre}
        descripcion={hospital.descripcion}
        rating={hospital.rating}
        reviews={hospital.reviews}
      />

      <section className="hospital-info">
        <h2>Quiénes somos</h2>
        <p>{hospital.quienes_somos}</p>
      </section>

      <section className="hospital-services">
        <h2>Especialidades</h2>
        {hospital.especialidades?.map((esp, i) => (
          <EspecialidadesCard
            key={i}
            titulo={esp.nombre}
            descripcion={esp.descripcion}
            puntuacion={esp.puntuacion}
            urlTurno={esp.url}
          />
        ))}
      </section>

      <section className="hospital-reviews">
        <ComentariosList comentarios={comentarios} />
        <ComentarioForm onAgregarComentario={(autor, texto, puntuacion) =>
          setComentarios([...comentarios, { autor, texto, puntuacion }])
        } />
      </section>
    </main>
  );
}

export default HospitalPublico;
