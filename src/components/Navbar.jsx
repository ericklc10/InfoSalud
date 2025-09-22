import React, { useState } from "react";
import "../estilos/Navbar.css";
import logo from "../assets/imagenes/logo2.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="header">
      <div className="container-header">
        {/* Logo */}
        <a href="/" className="logo">
          <img src={logo} alt="Logo InfoSalud+" />
        </a>

        {/* Buscador (escritorio) */}
        <div className="search-box desktop-only">
          <input type="text" placeholder="Buscar hospitales, especialidades..." />
          <button type="submit">&#128269;</button>
        </div>

        {/* Acciones (escritorio) */}
       <div className="acciones desktop-only">
  <Link to="/registro" className="registro-link">Registrarse</Link>
  <Link to="/login" className="login-btn">Iniciar sesión</Link>
</div>

        {/* Botón hamburguesa (móvil) */}
        <div className="menu-toggle mobile-only" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar móvil */}
      <div className={`sidebar-movil ${menuAbierto ? "activo" : ""}`}>
        <button className="cerrar-menu" onClick={toggleMenu}>✖</button>

        <div className="sidebar-contenido">
          <img src={logo} alt="Logo InfoSalud+" className="logo-sidebar" />

          <div className="search-box">
            <input type="text" placeholder="Buscar..." />
            <button type="submit">&#128269;</button>
          </div>

          <div className="acciones-movil">
  <Link to="/login" className="login-btn">Iniciar sesión</Link>
  <Link to="/registro" className="registro-link">Registrarse</Link>
</div>

          <nav className="nav-movil">
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/novedades">Novedades</a></li>
              <li><a href="/hospitales">Hospitales</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
