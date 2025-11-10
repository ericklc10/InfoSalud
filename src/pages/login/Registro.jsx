import React, { useState } from "react";
import "./Auth.css";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // ✅ nuevo campo para foto de perfil
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          password: contraseña,
          avatar_url: avatarUrl, // ✅ enviar avatar al backend
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Registro exitoso → redirigir directo a login
        window.location.href = "/login";
      } else {
        setError(data.message || "Error al registrar usuario");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="URL del avatar (opcional)"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <button type="submit">Registrarse</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        ¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a>
      </p>
    </div>
  );
}

export default Registro;
