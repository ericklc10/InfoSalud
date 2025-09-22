import React, { useState } from "react";
// import "./es/HospitalGarrahan.css";
import Hospitales from "../../../components/Hospitales_cards";
import HospitalHeader from "../../../components/HospitalHeader";
import EspecialidadesCard from "../../../components/EspecialidadesCard";
import ComentariosList from "../../../components/ComentariosList";
import ComentarioForm from "../../../components/ComentarioForm";

interface Comentario {
  autor: string;
  texto: string;
  puntuacion: number;
}

const HospitalGarrahan: React.FC = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([
    { autor: "Valeria", texto: "Atención impecable y humana.", puntuacion: 5 },
    { autor: "Martín", texto: "Profesionales comprometidos con los niños.", puntuacion: 5 },
  ]);

  const agregarComentario = (autor: string, texto: string, puntuacion: number) => {
    setComentarios([...comentarios, { autor, texto, puntuacion }]);
  };

  return (
    <>
      {/* Banner */}
      <section className="hospital-banner">
        <img
          src="https://www.infobae.com/resizer/v2/AXXMBZZQWBFVTBNJAR3HB7MEVE.jpg?auth=9163453620ec77af350c50a048e178582401fa8b3c2b668d4cc8e19558c68fa5&smart=true&width=992&height=558&quality=85"
          alt="Hospital Garrahan"
          className="banner-img"
        />
      </section>

      <main className="hospital-page">
        {/* Header */}
        <HospitalHeader
          nombre="Hospital de Pediatría Garrahan"
          descripcion="Centro de referencia nacional en atención pediátrica de alta complejidad"
          rating="4.9"
          reviews={620}
        />

        {/* Información */}
        <section className="hospital-info">
          <h2>Quiénes somos</h2>
          <p>
            El Hospital Garrahan es el principal centro pediátrico de Argentina,
            especializado en atención integral, docencia e investigación. Brinda
            servicios gratuitos y de excelencia a niños de todo el país.
          </p>
        </section>

        {/* Especialidades */}
        <section className="hospital-services">
          <h2>Especialidades</h2>
          <EspecialidadesCard
            titulo="Neonatología"
            descripcion="Atención especializada para recién nacidos con patologías complejas."
            puntuacion={4.9}
            urlTurno="https://www.garrahan.gov.ar/turnos"
          />
          <EspecialidadesCard
            titulo="Oncohematología"
            descripcion="Tratamiento integral de cáncer infantil y enfermedades de la sangre."
            puntuacion={4.8}
            urlTurno="https://www.garrahan.gov.ar/turnos"
          />
          <EspecialidadesCard
            titulo="Cirugía Pediátrica"
            descripcion="Intervenciones quirúrgicas de alta complejidad en niños."
            puntuacion={4.7}
            urlTurno="https://www.garrahan.gov.ar/turnos"
          />
        </section>

        {/* Mapa */}
        <section className="hospital-map">
          <h2>Ubicación</h2>
          <iframe
            title="Mapa Hospital Garrahan"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.982..."
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
            <li>Nuevo centro de diagnóstico por imágenes</li>
            <li>Campaña de vacunación infantil</li>
            <li>Premio internacional en investigación pediátrica</li>
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
            <img src="https://www.garrahan.gov.ar/images/galeria1.jpg" alt="Instalación 1" />
            <img src="https://www.garrahan.gov.ar/images/galeria2.jpg" alt="Instalación 2" />
            <img src="https://www.garrahan.gov.ar/images/galeria3.jpg" alt="Instalación 3" />
          </div>
        </section>

        {/* Otros hospitales */}
        <Hospitales />
      </main>
    </>
  );
};

export default HospitalGarrahan;
