import React from "react";
import "../estilos/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">

        {/* Columna 1 */}
        <div>
          <h4>InfoSalud+</h4>
          <ul>
            <li><Link to="/quienes-somos">Quiénes somos</Link></li>
            
            <li><Link to="/contacto">Contacto</Link></li>
          
          </ul>
        </div>

        {/* Columna 2 */}
        <div>
          <h4>Hospitales</h4>
          <ul>
            
            <li>
              <Link to="/registro-hospital">Crear cuenta de hospital</Link>
            </li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h4>Pacientes</h4>
          <ul>
            <li><Link to="/buscar">Buscar hospitales</Link></li>
            <li>
  <Link to="/#especialidades">Especialidades</Link>
</li>

            
          </ul>
        </div>  

        {/* Columna 4 */}
        <div>
          <h4>Síguenos</h4>
          <ul>
            
            
            
            <li><Link to="https://www.linkedin.com/in/erick-lc">LinkedIn </Link></li>

            <li><Link to="https://github.com/ericklc10">github </Link></li>

            <li><Link to="https://www.instagram.com/ericklc110/">Instagram </Link></li>

          </ul>
        </div>
      </div>

      <p className="copy">&copy; 2025 InfoSalud+. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
