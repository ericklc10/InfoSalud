import React from "react";
import { Link } from "react-router-dom";
import "../estilos/Home.css"; // usa los mismos estilos que ya tenés

function Hospitales() {
  return (
    <section className="hospitales">
      <h2>Hospitales Destacados</h2>
      <div className="cards">
        <Link to="/hospital/italiano" className="card">

          <img
            src="https://www.hospitalitaliano.org.ar/hiba/files/styles/max_650x650/public/2025-03/Direcci%C3%B3n%20M%C3%A9dica%20-%20Acerca%20del%20Hospital.jpg?itok=Eu_oY4mm"
            alt="Hospital Italiano"
          />
          <h3>Hospital Italiano</h3>
        </Link>

        <Link to="/hospital/garrahan" className="card">
          <img
            src="https://radioprovincia.gba.gob.ar/images/Hospital_Garrahan.jpg"
            alt="Hospital Garrahan"
          />
          <h3>Hospital Garrahan</h3>
        </Link>

        <Link to="/hospital/aleman" className="card">
          <img
            src="https://i.ytimg.com/vi/lAGNEGWJ3Ic/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDXt7e6hglmajbJwFYn6-s4P4LjbQ"
            alt="hospital aleman"
          />
          <h3>Hospital alemán</h3>
        </Link>

        <Link to="/hospital/favaloro" className="card">
          <img
            src="https://hospitalfavaloro.org/wp-content/uploads/2024/06/Sin-titulo.png"
            alt="Hospital Favaloro"
          />
          <h3>Hospital Favaloro</h3>
        </Link>
      </div>
    </section>
  );
}

export default Hospitales;
