import React, { useState } from "react";
import "./Auth.css";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password: contraseña }),
      });

      const data = await res.json();

      if (res.ok) {
        // Generar fallback de foto si no viene del backend
        const foto =
          data.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            nombre
          )}&background=3498db&color=fff`;

        const usuario = {
          id: data.id,
          nombre: data.nombre,
          email: data.email || email,
          tipo: "usuario",
          token: data.token,
          foto, // ✅ guardamos la foto
        };

        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("token", data.token);

        // 🔔 Disparar evento para que Navbar se actualice
        window.dispatchEvent(new Event("usuarioActualizado"));

        // Redirigir al home
        window.location.href = "/";
      } else {
        alert(data.message || "Error al registrar");
      }
    } catch (err) {
      alert("No se pudo conectar con el servidor");
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
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a>
      </p>
    </div>
  );
}

export default Registro;
