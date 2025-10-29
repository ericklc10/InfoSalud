import React from "react";
import "../estilos/QuienesSomos.css";

function QuienesSomos() {
  return (
    <div className="quienes-container">
      {/* Banner principal */}
      <section className="quienes-banner">
        <div className="overlay"></div>
        <div className="quienes-texto">
          <h1>Quiénes Somos</h1>
          <p>
            En <strong>InfoSalud+</strong> trabajamos para conectar centros de salud y pacientes en una red moderna, segura y colaborativa.
            Nuestro compromiso es mejorar la gestión médica y acercar la salud digital a toda la comunidad.
          </p>
        </div>
      </section>

      {/* Secciones informativas */}
      <section className="quienes-info">
        <div className="quienes-bloque">
          <h2>Misión</h2>
          <p>
            Brindar soluciones tecnológicas para la salud, facilitando la comunicación entre instituciones y pacientes con herramientas innovadoras y accesibles.
          </p>
        </div>

        <div className="quienes-bloque">
          <h2>Visión</h2>
          <p>
            Ser la plataforma de referencia en gestión médica digital en el ambito web, impulsando un
            sistema sanitario más eficiente, humano y conectado.
          </p>
        </div>

        <div className="quienes-bloque">
          <h2>Valores</h2>
          <ul>
            <li>Compromiso con la innovación en salud</li>
            <li>Transparencia y seguridad de la información</li>
            <li>Colaboración entre pacientes</li>
            <li>Ética y responsabilidad social</li>
            <li>Empatía hacia cada paciente</li>
          </ul>
        </div>
      </section>

      {/* Imagen final */}
      <section className="quienes-imagen">
        <img
          src="../imagenes/logo2"
          alt="Equipo médico trabajando en conjunto"
        />
      </section>
    </div>
  );
}

export default QuienesSomos;
