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

function Hospitales_General() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [promedioPuntuacion, setPromedioPuntuacion] = useState(null);
   


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


  const nombreAutor =
    hospitalLogueado?.nombre?.trim() ||
    usuarioLogueado?.nombre?.trim() ||
    usuarioLogueado?.email?.trim() ||
    "Anónimo";

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

      let comentarios = [];
      if (Array.isArray(data.comentarios)) {
        comentarios = data.comentarios;
      } else if (typeof data.comentarios === "string") {
        try {
          comentarios = JSON.parse(data.comentarios);
        } catch {
          console.warn("⚠️ Comentarios mal formateados:", data.comentarios);
        }
      }

      setHospital({ ...data, especialidades, comentarios });
    } catch (err) {
      console.error("Error al cargar hospital:", err);
    }
  };

  const fetchPromedio = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/${id}/promedio-puntuacion`);
      const data = await res.json();
      setPromedioPuntuacion(data.promedio || null);
    } catch (err) {
      console.error("Error al obtener promedio de puntuación:", err);
    }
  };

  if (id) {
    fetchHospital();
    fetchPromedio();
  }
}, [id]); // ✅ cierre correcto del useEffect



  if (!hospital) return <p>Cargando hospital...</p>;

  return (
    <>
      <BannerHospital
        imagenUrl={hospital.imagen_url || "/default-banner.jpg"}
        nombre={hospital.nombre || "Hospital sin nombre"}
      />

      <main className="hospital-page">
        <div className="hospital-contenido">
          <HospitalHeader
  id={hospital.id}
  nombre={hospital.nombre}
  descripcion={hospital.descripcion || "Sin descripción disponible"}
  rating={promedioPuntuacion ? promedioPuntuacion.toFixed(1) : "—"}
  reviews={hospital.comentarios?.length || 0}
  especialidades={hospital.especialidades}
/>



       

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
            <ComentariosList comentarios={hospital.comentarios} />
            {!esPropioPerfil ? (
              <ComentarioForm
                hospitalId={hospital.id}
                usuarioNombre={nombreAutor}
                onComentarioAgregado={(comentariosActualizados) =>
                  setHospital({ ...hospital, comentarios: comentariosActualizados })
                }
              />
            ) : (
              <p className="comentario-bloqueado">
                ⚠️ Inicia sesion como Usuario para comentar
                
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
      ⚠️ Los hospitales no pueden puntuar su propio perfil.
    </p>
  )}
</section>



          <Hospitales />
        </div>
      </main>
    </>
  );
}

export default Hospitales_General;
