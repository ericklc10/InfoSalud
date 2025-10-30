////Navbar


import React, { useState, useEffect } from "react";
import "../estilos/Navbar.css";
import logo from "../assets/imagenes/logo2.png";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import Buscador from "./Buscador";


function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
  const cargarNombre = () => {
    const hospital = JSON.parse(localStorage.getItem("hospitalLogueado"));
const usuario = JSON.parse(localStorage.getItem("usuario"));

const nombre = hospital?.nombre || usuario?.nombre || "";
setNombreUsuario(nombre);

  };

  cargarNombre(); // inicial

  const handleUsuarioActualizado = () => {
    cargarNombre(); // actualizar cuando se dispara el evento
  };

  window.addEventListener("usuarioActualizado", handleUsuarioActualizado);

  return () => {
    window.removeEventListener("usuarioActualizado", handleUsuarioActualizado);
  };
}, []);


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

        {/* Buscador */}
        <div className="search-box desktop-only">
  <Buscador />
</div>

        {/* Acciones */}
        <div className="acciones desktop-only">
          {nombreUsuario ? (
            <UserMenu nombre={nombreUsuario} />
          ) : (
            <>
              <Link to="/registro" className="registro-link">Registrarse</Link>
              <Link to="/login" className="login-btn">Iniciar sesión</Link>
            </>
          )}
        </div>

        {/* Botón hamburguesa */}
        <div className="menu-toggle mobile-only" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar móvil */}
      {/* Sidebar móvil */}
<div className={`sidebar-movil ${menuAbierto ? "activo" : ""}`}>
  <button className="cerrar-menu" onClick={toggleMenu}>✖</button>

  <div className="sidebar-contenido">
    <img src={logo} alt="Logo InfoSalud+" className="logo-sidebar" />

    {/* Buscador móvil: usar el mismo componente */}
    <div className="search-box">
      <Buscador />
    </div>

    <div className="acciones-movil">
      {nombreUsuario ? (
        <UserMenu nombre={nombreUsuario} />
      ) : (
        <>
          <Link to="/login" className="login-btn">Iniciar sesión</Link>
          <Link to="/registro" className="registro-link">Registrarse</Link>
        </>
      )}
    </div>
  </div>
</div>

    </header>
  );
}

export default Navbar;
