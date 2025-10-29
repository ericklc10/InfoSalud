import React, { useState } from "react";
import "./Auth.css";

function RegistroHospital() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register-hospital`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          password: contraseña
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Guardar hospital completo en localStorage
        const hospital = {
          id: data.id,
          nombre: data.nombre,
          email: email,
          tipo: "hospital",
          token: data.token
        };

        localStorage.setItem("hospitalLogueado", JSON.stringify(hospital));
        localStorage.setItem("token", data.token);

        // 🔔 Disparar evento para que Navbar se actualice
        window.dispatchEvent(new Event("usuarioActualizado"));

        // Redirigir al home
        window.location.href = "/";
      } else {
        alert(data.message || "Error al registrar hospital");
      }
    } catch (err) {
      alert("No se pudo conectar con el servidor");
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
      </form>
      <p>
        ¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a>
      </p>
    </div>
  );
}

export default RegistroHospital;
