import React, { useState } from "react";
import "./HospitalItaliano.css";
import Hospitales from "../../../components/Hospitales_cards";
import HospitalHeader from "../../../components/HospitalHeader";
import EspecialidadesCard from "../../../components/EspecialidadesCard";
import ComentariosList from "../../../components/ComentariosList";
import ComentarioForm from "../../../components/ComentarioForm";



function HospitalItaliano() {
  const [comentarios, setComentarios] = useState([
    { autor: "María", texto: "Excelente atención y trato humano.", puntuacion: 5 },
    { autor: "Juan", texto: "Muy buena infraestructura y profesionales.", puntuacion: 4 },
    { autor: "Lucía", texto: "Un poco de demora en la guardia, pero excelente equipo médico.", puntuacion: 4 },
  ]);

  const agregarComentario = (autor, texto, puntuacion) => {
    setComentarios([...comentarios, { autor, texto, puntuacion }]);
  };

  return (
    <>
      {/* Banner */}
      <section className="hospital-banner">
        <img
          src="https://wagg.com.ar/wp-content/uploads/2024/06/602-Hospital-Italiano_EP_01.jpg"
          alt="Hospital Italiano"
          className="banner-img"
        />
      </section>

      <main className="hospital-page">
        {/* Header */}
        <HospitalHeader
          nombre="Hospital Italiano"
          descripcion="Hospital Italiano de Buenos Aires"
          rating="4.5"
          reviews={230}
        />

        {/* Información */}
        <section className="hospital-info">
          <h2>Quiénes somos</h2>
          <p>
            El Hospital Italiano de Buenos Aires es un centro de alta complejidad
            con más de 160 años de trayectoria en la salud. Ofrece atención integral 
            con profesionales de excelencia y tecnología de vanguardia.
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
            title="Mapa Hospital Italiano"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.281065312636!2d-58.43061182464818!3d-34.5965768574597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9b0b692e0f3%3A0xa91e67e3deb18f7b!2sHospital%20Italiano%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1694461572734!5m2!1ses!2sar"
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
            <li>Nueva guardia pediátrica</li>
            <li>Campaña de vacunación contra la gripe</li>
            <li>Estudio internacional en cardiología</li>
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
            <img src="https://www.delabahia.com.ar/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-11-at-5.53.41-PM-800x450.jpeg" alt="Instalación 1" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_S-AcjbroDYJ9LJ7VJUhciXr8aNMxgk3KKg&s" alt="Instalación 2" />
            <img src="https://wagg.com.ar/wp-content/uploads/2024/06/602-Hospital-Italiano_EP_01.jpg" alt="Instalación 3" />
          </div>
        </section>

        {/* Otros hospitales */}
        <Hospitales />
      </main>
    </>
  );
}

export default HospitalItaliano;
