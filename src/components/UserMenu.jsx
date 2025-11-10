import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/UserMenu.css";

function UserMenu({ nombre }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const url = localStorage.getItem("avatar_url");
    setAvatarUrl(url || "");
  }, []);


// ✅ escuchar cambios de avatar
  useEffect(() => {
    const actualizarAvatar = () => {
      const url = localStorage.getItem("avatar_url");
      setAvatarUrl(url || "");
    };
    window.addEventListener("avatarActualizado", actualizarAvatar);
    return () => window.removeEventListener("avatarActualizado", actualizarAvatar);
  }, []);


  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("usuarioActualizado")); // 👈 notifica al Navbar
    navigate("/login");
  };

  const handleEditProfile = () => {
    const tipo = localStorage.getItem("tipo");
    const usuarioId = localStorage.getItem("usuario_id");
    const hospitalId = localStorage.getItem("hospital_id");
    const id = tipo === "usuario" ? usuarioId : hospitalId;

    if (!tipo || !id) {
      alert("No se encontró información del perfil. Iniciá sesión de nuevo.");
      handleLogout();
      return;
    }

    navigate(`/${tipo}/editar/${id}`);
  };

  const handleVerPerfil = () => {
    const tipo = localStorage.getItem("tipo");
    const hospitalId = localStorage.getItem("hospital_id");

    if (tipo === "hospital" && hospitalId) {
      navigate(`/hospitales/${hospitalId}`);
    }
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <div className="user-trigger" onClick={() => setOpen(!open)}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="avatar-circle" />
        ) : (
          <span className="default-icon">👤</span>
        )}
        <span className="user-name">@{nombre} ⌄</span>
      </div>

      {open && (
  <div className="dropdown">
    {localStorage.getItem("tipo") === "hospital" && (
      <button onClick={handleVerPerfil}>Tu perfil</button>
    )}
    <button onClick={handleEditProfile}>Editar perfil</button>
    <button onClick={handleLogout}>Cerrar sesión</button>
  </div>
)}

    </div>
  );
}

export default UserMenu;
