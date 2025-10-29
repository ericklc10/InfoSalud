import React, { useState } from "react";
import "../estilos/Contacto.css";

function Contacto() {
  const [formData, setFormData] = useState({
    destinatario: "",
    nombre: "",
    email: "",
    telefono: "",
    provincia: "",
    localidad: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      alert("Mensaje enviado correctamente ✅");
    } else {
      alert("Hubo un error al enviar el mensaje ❌");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error de conexión con el servidor");
  }
};


  return (
    <div className="contacto-container">
      <h2>📬 Formulario de Contacto</h2>
      <form className="contacto-form" onSubmit={handleSubmit}>
        
        {/* Destinatario */}
        <label>
          Destinatario
          <select
            name="destinatario"
            value={formData.destinatario}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un destinatario...</option>
            <option value="info">Información general</option>
            <option value="soporte">Soporte técnico</option>
            <option value="afiliaciones">Afiliaciones</option>
          </select>
        </label>

        {/* Nombre */}
        <label>
          Nombre y Apellido
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>

        {/* Email */}
        <label>
          Mail
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        {/* Teléfono */}
        <label>
          Teléfono
          <input
            type="tel"
            name="telefono"
            placeholder="Número de teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </label>

        {/* Provincia */}
        <label>
          Provincia
          <select
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
          >
            <option value="">Seleccione opción...</option>
            <option value="buenosaires">Buenos Aires</option>
            <option value="cordoba">Córdoba</option>
            <option value="santafe">Santa Fe</option>
            <option value="mendoza">Mendoza</option>
          </select>
        </label>

        {/* Localidad */}
        <label>
          Localidad
          <input
            type="text"
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
          />
        </label>

        {/* Mensaje */}
        <label>
          Mensaje
          <textarea
            name="mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn-enviar">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;
