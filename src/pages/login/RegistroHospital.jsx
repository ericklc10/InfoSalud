import React, { useState } from "react";
import "./Auth.css";

function RegistroHospital() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(""); // estado para mostrar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register-hospital`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password: contraseña })
      });

      const data = await res.json();

      if (res.ok) {
        // Registro exitoso → redirigir directo a login
        window.location.href = "/login";
      } else {
        setError(data.message || "Error al registrar hospital");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear cuenta de hospital</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del hospital"
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
        <button type="submit">Registrarse como hospital</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a></p>
    </div>
  );
}

export default RegistroHospital;
