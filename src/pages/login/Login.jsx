import React, { useState } from "react";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: contraseña }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.message);

        // Guardar datos en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("tipo", data.tipo);

        // Generar fallback de foto si no viene del backend
        const foto =
          data.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            data.nombre
          )}&background=3498db&color=fff`;

        if (data.tipo === "usuario") {
          localStorage.setItem("usuario_id", data.id);
          localStorage.setItem(
            "usuario",
            JSON.stringify({
              id: data.id,
              nombre: data.nombre,
              email: data.email || email,
              foto, // ✅ guardamos la foto
            })
          );
        } else if (data.tipo === "hospital") {
          localStorage.setItem("hospital_id", data.id);
          localStorage.setItem(
            "hospitalLogueado",
            JSON.stringify({
              id: data.id,
              nombre: data.nombre,
              email: data.email || email,
              foto, // opcional
            })
          );
        }

        // Redirigir al home
        window.location.href = "/";
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      <p>
        ¿No tenés cuenta? <a href="/registro">Registrate</a>
      </p>
    </div>
  );
}

export default Login;
