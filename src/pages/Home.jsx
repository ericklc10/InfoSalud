import React, { useEffect, useState } from "react";
import "../estilos/Home.css";
import { Link } from "react-router-dom";
import Hospitales_cards from "../components/Hospitales_cards";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      img: "https://nexu.co/blog/wp-content/uploads/2024/09/enfermedades-medicina-interna.jpg",
      title: "Bienvenido a InfoSalud+",
      text: "Tu portal confiable de información médica y hospitalaria.",
      link: "/quienes-somos"
    },
    {
      img: "https://www.nosequeestudiar.net/site/assets/files/217/medicina-mano-medica.jpg",
      title: "Atención de calidad",
      text: "Conectá tu hospital con InfoSalud+ y llegá a más pacientes.",
      link: "/registro-hospital"
    },
    {
      img: "https://tecscience.tec.mx/es/wp-content/uploads/sites/8/2024/12/medicina-de-precision.jpg",
      title: "Salud al alcance de todos",
      text: "Buscá hospitales por especialidad, ubicación o nombre.",
      link: "/buscar"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="home">
      <div className="home-wrapper">
        {/* Hero - Carrusel */}
        <section className="hero">
          <div className="carousel">
            {slides.map((slide, index) => (
              <div
                className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                key={index}
              >
                <img src={slide.img} alt={slide.title} />
                <div className="hero-text">
                  <h1>{slide.title}</h1>
                  <p>{slide.text}</p>
                  <Link to={slide.link}>
                    <button className="hero-button">Conocé más</button>
                  </Link>
                </div>
              </div>
            ))}

            {/* Indicadores estilo barra */}
            <div className="carousel-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Intro */}
        <div className="titulo">
          <h1>InfoSalud+: Tu portal de confianza</h1>
          <span className="divider"></span>
        </div>

        <div className="texto-titulo">
          <h3>
            InfoSalud+ es una plataforma pensada para acercar la salud a todas las
            personas. Nuestro objetivo es ofrecer información médica clara,
            confiable y actualizada, ayudando a la comunidad a tomar decisiones
            informadas sobre su bienestar.
          </h3>
        </div>

        {/* Hospitales destacados */}
        <Hospitales_cards />
      </div>
    </div>
  );
}

export default Home;
