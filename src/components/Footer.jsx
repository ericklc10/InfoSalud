import React from "react";
import "../estilos/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">

        {/* Columna 1 */}
        <div>
          <h4>InfoSalud+</h4>
          <ul>
            <li>Quiénes somos</li>
           
            <li>Contacto</li>
            <li>Política de privacidad</li>
            <li>Términos y condiciones</li>
          </ul>
        </div>

        {/* Columna 2 */}
        <div>
          <h4>Hospitales</h4>
          <ul>
            <li>Únete a nosotros</li>
            <li>Crear cuenta de hospital</li>
        
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h4>Pacientes</h4>
          <ul>
            <li>Buscar hospitales</li>
            <li>Especialidades</li>
            <li>Reseñas y calificaciones</li>
            <li>Solicitar turno</li>
            <li>Preguntas frecuentes</li>
          </ul>
        </div>

        {/* Columna 4 */}
        <div>
          <h4>Síguenos</h4>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter / X</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>

      <p className="copy">&copy; 2025 InfoSalud+. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
