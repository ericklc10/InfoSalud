import React, { useState } from "react";
// import "./HospitalAleman.css";
import Hospitales from "../../../components/Hospitales_cards";
import HospitalHeader from "../../../components/HospitalHeader";
import EspecialidadesCard from "../../../components/EspecialidadesCard";
import ComentariosList from "../../../components/ComentariosList";
import ComentarioForm from "../../../components/ComentarioForm";


function HospitalAleman() {
  const [comentarios, setComentarios] = useState([
    { autor: "Sofía", texto: "Atención excelente y muy profesional.", puntuacion: 5 },
    { autor: "Tomás", texto: "Instalaciones modernas y trato humano.", puntuacion: 4 },
  ]);

  const agregarComentario = (autor, texto, puntuacion) => {
    setComentarios([...comentarios, { autor, texto, puntuacion }]);
  };

  return (
    <>
      {/* Banner */}
      <section className="hospital-banner">
        <img
          src="https://ha.cdn.marketica.com/wp-content/uploads/2025/03/Foto-render-juncal-small.jpg"
          alt="Hospital Alemán"
          className="banner-img"
        />
      </section>

      <main className="hospital-page">
        {/* Header */}
        <HospitalHeader
          nombre="Hospital Alemán"
          descripcion="Institución médica de excelencia con más de 150 años de trayectoria"
          rating="4.7"
          reviews={410}
        />

        {/* Información */}
        <section className="hospital-info">
          <h2>Quiénes somos</h2>
          <p>
            El Hospital Alemán es una institución privada sin fines de lucro, reconocida por su
            calidad médica, tecnología avanzada y compromiso con la salud. Brinda atención integral
            en todas las especialidades, con enfoque en la seguridad del paciente y la innovación.
          </p>
        </section>

        {/* Servicios */}
        <section className="hospital-services">
          <h2>Servicios destacados</h2>
          <ul>
            <li>Emergencias 24 horas</li>
            <li>Centro de diagnóstico por imágenes</li>
            <li>Cirugía robótica</li>
            <li>Oncología multidisciplinaria</li>
            <li>Medicina preventiva</li>
          </ul>
        </section>

        {/* Especialidades */}
        <section className="hospital-services">
          <h2>Especialidades</h2>
          <EspecialidadesCard
            titulo="Cirugía Robótica"
            descripcion="Intervenciones de alta precisión con tecnología Da Vinci."
            puntuacion={4.9}
            urlTurno="https://www.hospitalaleman.org.ar/turnos/"
          />
          <EspecialidadesCard
            titulo="Oncología"
            descripcion="Tratamientos personalizados con enfoque integral."
            puntuacion={4.8}
            urlTurno="https://www.hospitalaleman.org.ar/turnos/"
          />
          <EspecialidadesCard
            titulo="Diagnóstico por Imágenes"
            descripcion="Equipos de última generación para estudios clínicos."
            puntuacion={4.7}
            urlTurno="https://www.hospitalaleman.org.ar/turnos/"
          />
        </section>

        {/* Mapa */}
        <section className="hospital-map">
          <h2>Ubicación</h2>
          <iframe
            title="Mapa Hospital Alemán"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.066... (URL completa)"
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
            <li>Nuevo centro de cirugía robótica</li>
            <li>Programa de salud cardiovascular</li>
            <li>Convenio internacional con universidades europeas</li>
          </ul>
        </section>

        {/* Comentarios */}
        <section className="hospital-reviews">
          <ComentariosList comentarios={comentarios} />
          <ComentarioForm onAgregarComentario={agregarComentario} />
        </section>

        {/* Galería */}
        <section className="hospital-gallery">
          <h2>Galería de imágenes</h2>
          <div className="gallery-grid">
            <img src="https://www.hospitalaleman.org.ar/wp-content/uploads/2022/03/HA-Edificio.jpg" alt="Instalación 1" />
            <img src="https://www.hospitalaleman.org.ar/wp-content/uploads/2022/03/HA-Recepcion.jpg" alt="Instalación 2" />
            <img src="https://www.hospitalaleman.org.ar/wp-content/uploads/2022/03/HA-Sala.jpg" alt="Instalación 3" />
          </div>
        </section>

        {/* Otros hospitales */}
        <Hospitales />
      </main>
    </>
  );
}

export default HospitalAleman;
