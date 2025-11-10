import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HospitalHeader from "../../components/HospitalHeader";
import EspecialidadesCard from "../../components/EspecialidadesCard";
import ComentariosList from "../../components/ComentariosList";
import ComentarioForm from "../../components/ComentarioForm";
import Hospitales from "../../components/Hospitales_cards";
import BannerHospital from "../../components/BannerHospital";

import "../../estilos/HospitalPerfil.css";

import PuntuacionForm from "../../components/PuntuacionForm";

function HospitalPerfil() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [promedioPuntuacion, setPromedioPuntuacion] = useState(null);
   


  // ✅ Validación robusta de localStorage
  let hospitalLogueado = null;
  let usuarioLogueado = null;

  try {
    const rawHospital = localStorage.getItem("hospitalLogueado");
    hospitalLogueado = rawHospital ? JSON.parse(rawHospital) : null;
  } catch (e) {
    console.warn("⚠️ Error al parsear hospitalLogueado:", e);
  }

  try {
    const rawUsuario = localStorage.getItem("usuario");
    usuarioLogueado = rawUsuario ? JSON.parse(rawUsuario) : null;
  } catch (e) {
    console.warn("⚠️ Error al parsear usuarioLogueado:", e);
  }

  const puedePuntuar = !!usuarioLogueado; // solo usuarios logueados pueden puntuar


  // Extraer nombre del autor
  const nombreAutor =
    hospitalLogueado?.nombre?.trim() ||
    usuarioLogueado?.nombre?.trim() ||
    usuarioLogueado?.email?.trim() ||
    "Anónimo";

  // Verificar si el hospital logueado está viendo su propio perfil
  const esPropioPerfil = hospitalLogueado?.id === id;

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/${id}`);
        const data = await res.json();

        const especialidades =
          typeof data.especialidades === "string"
            ? JSON.parse(data.especialidades)
            : data.especialidades;

        let comentariosCargados = [];
        if (Array.isArray(data.comentarios)) {
          comentariosCargados = data.comentarios;
        } else if (typeof data.comentarios === "string") {
          try {
            comentariosCargados = JSON.parse(data.comentarios);
          } catch {
            console.warn("⚠️ Comentarios mal formateados");
          }
        }

        setHospital({ ...data, especialidades });
        setComentarios(comentariosCargados);
      } catch (err) {
        console.error("Error al cargar hospital:", err);
      }


      const fetchPromedio = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/${id}/promedio-puntuacion`);
    const data = await res.json();
    setPromedioPuntuacion(data.promedio || null);
  } catch (err) {
    console.error("Error al obtener promedio de puntuación:", err);
  }
};

fetchPromedio();



    };

    if (id) fetchHospital();
  }, [id]);

  if (!hospital) return <p>Cargando hospital...</p>;

  return (
    <>
      <BannerHospital imagenUrl={hospital.imagen_url} nombre={hospital.nombre} />

      <main className="hospital-page">
        <div className="hospital-contenido">
          <HospitalHeader
  id={hospital.id}
  nombre={hospital.nombre}
  descripcion={hospital.descripcion}
  rating={promedioPuntuacion ? promedioPuntuacion.toFixed(1) : "—"}
  reviews={comentarios.length}
  especialidades={hospital.especialidades}
/>




          <section className="hospital-info">
            <h2>Quiénes somos</h2>
            <p>{hospital.descripcion || "Este hospital aún no ha completado su descripción."}</p>
          </section>

        

<section className="hospital-services">
  <h2>Especialidades</h2>
  {Array.isArray(hospital.especialidades) && hospital.especialidades.length > 0 ? (
    hospital.especialidades.map((esp, index) => (
  <EspecialidadesCard
    key={index}
    hospitalId={hospital.id}
    espKey={esp.titulo} // 👈 ahora el titulo
    titulo={esp.titulo}
    descripcion={esp.descripcion}
    promedioInicial={esp.promedio || 0}
    urlTurno={esp.link}
    usuarioId={usuarioLogueado?.id}
    puedePuntuar={puedePuntuar}
  />
))

  ) : (
    <p>No se han cargado especialidades.</p>
  )}
</section>


          {hospital.ubicacion && (
            <section className="hospital-map">
              <h2>Ubicación</h2>
              <iframe
                title={`Mapa ${hospital.nombre}`}
                src={hospital.ubicacion}
                width="100%"
                height="300"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </section>
          )}

          <section className="hospital-reviews">
            <ComentariosList comentarios={comentarios} />
            {!esPropioPerfil ? (
              <ComentarioForm
                hospitalId={hospital.id}
                usuarioNombre={nombreAutor}
                onComentarioAgregado={(comentariosActualizados) =>
                  setComentarios(comentariosActualizados)
                }
              />
            ) : (
              <p className="comentario-bloqueado">
                ⚠️ No puedes comentar en tu propio perfil.
              </p>
            )}
          </section>

          {Array.isArray(hospital.galeria) && hospital.galeria.length > 0 && (
            <section className="hospital-gallery">
              <h2>Galería de imágenes</h2>
              <div className="gallery-grid">
                {hospital.galeria.map((url, index) => (
                  <img key={index} src={url} alt={`Instalación ${index + 1}`} />
                ))}
              </div>
            </section>
          )}

          <section className="hospital-rating">
            <h2>Tu puntuación</h2>
            {!esPropioPerfil ? (
              <PuntuacionForm hospitalId={hospital.id} 
              onPromedioActualizado={(nuevoPromedio) => setPromedioPuntuacion(nuevoPromedio)}
              />
            ) : (
              <p className="comentario-bloqueado">
                ⚠️ No puedes puntuar tu propio perfil.
              </p>
            )}
          </section>

          <Hospitales />
        </div>
      </main>
    </>
  );
}

export default HospitalPerfil;
