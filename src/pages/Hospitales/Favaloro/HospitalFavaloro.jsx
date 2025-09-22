import React, { useState } from "react";
import "./HospitalFavaloro.css";
import Hospitales from "../../../components/Hospitales_cards";
import PuntuacionEstrellas from "../../../components/PuntuacionEstrellas";
import HospitalHeader from "../../../components/HospitalHeader";
import EspecialidadesCard from "../../../components/EspecialidadesCard";
import ComentariosList from "../../../components/ComentariosList";
import ComentarioForm from "../../../components/ComentarioForm";

function HospitalFavaloro() {
  const [comentarios, setComentarios] = useState([
    { autor: "Ana", texto: "Atención de primer nivel y trato humano excepcional. ⭐⭐⭐⭐⭐" },
    { autor: "Carlos", texto: "Instalaciones modernas y profesionales de excelencia. ⭐⭐⭐⭐⭐" },
    { autor: "Valeria", texto: "Atención impecable y humana. ⭐⭐⭐⭐⭐" },
    { autor: "Martín", texto: "Profesionales comprometidos con los niños. ⭐⭐⭐⭐⭐" },
  ]);

  const agregarComentario = (autor, texto) => {
    setComentarios([...comentarios, { autor, texto }]);
  };

  return (
    <>
      {/* Banner */}
      <section className="hospital-banner">
        <img
          src="https://www.infobae.com/resizer/v2/4N7SMR6MUBATLF5N6KL7HB35WA.jpg?auth=6ef2c05a16fa2907e85bcdeff6640eb3380e52d628232307c03eb461e6d97753&smart=true&width=1200&height=675&quality=85"
          alt="Hospital Favaloro"
          className="banner-img"
        />
      </section>

      <main className="hospital-page">
        {/* Header */}
        <HospitalHeader
          nombre="Hospital Universitario Fundación Favaloro"
          descripcion="Fundación Favaloro para la Investigación y la Docencia Médica"
          rating="4.8"
          reviews={540}
        />

        {/* Información */}
        <section className="hospital-info">
          <h2>Quiénes somos</h2>
          <p>
            La Fundación Favaloro es un centro de salud de alta complejidad
            reconocido internacionalmente por su excelencia médica, investigación
            y docencia. Fundada por el Dr. René Favaloro, combina atención
            personalizada con tecnología de vanguardia.
          </p>
        </section>

       
        {/* Especialidades */}
        <section className="hospital-services">
          <h2>Especialidades</h2>
          <EspecialidadesCard
            titulo="Cardiología"
            descripcion="Atención integral en enfermedades cardiovasculares con tecnología avanzada."
            puntuacion={4.8}
            urlTurno="https://www.fundacionfavaloro.org/turnos/"
          />
          <EspecialidadesCard
            titulo="Oncología"
            descripcion="Tratamientos personalizados y acompañamiento multidisciplinario."
            puntuacion={4.6}
            urlTurno="https://www.fundacionfavaloro.org/turnos/"
          />
        </section>

        {/* Mapa */}
        <section className="hospital-map">
          <h2>Ubicación</h2>
          <iframe
            title="Mapa Hospital Favaloro"
            src="https://maps.google.com/maps?q=hospital%20favaloro%20rafael%20castillo&t=m&z=12&output=embed&iwloc=near"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </section>

        {/* Novedades */}
        <section className="hospital-news">
          <h2>Últimas novedades</h2>
          <ul>
            <li>Nuevo centro de diagnóstico cardiovascular</li>
            <li>Programa de prevención de enfermedades cardíacas</li>
            <li>Investigación en terapias innovadoras</li>
          </ul>
        </section>

        {/* Comentarios */}
        <ComentariosList comentarios={comentarios} />
        <ComentarioForm onAgregarComentario={agregarComentario} />

        {/* Puntuación
        <section className="hospital-header">
          <PuntuacionEstrellas onChange={(valor) => console.log("Puntuación:", valor)} />
        </section> */}

        {/* Galería */}
        <section className="hospital-gallery">
          <h2>Galería de imágenes</h2>
          <div className="gallery-grid">
            <img src="https://www.fundacionfavaloro.org/wp-content/uploads/2020/06/imagen1.jpg" alt="Instalación 1" />
            <img src="https://www.fundacionfavaloro.org/wp-content/uploads/2020/06/imagen2.jpg" alt="Instalación 2" />
            <img src="https://www.fundacionfavaloro.org/wp-content/uploads/2020/06/imagen3.jpg" alt="Instalación 3" />
          </div>
        </section>

        {/* Otros hospitales */}
        <Hospitales />
      </main>
    </>
  );
}

export default HospitalFavaloro;
