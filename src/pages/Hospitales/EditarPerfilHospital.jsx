import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/EditarPerfilHospital.css";

function EditarPerfilHospital() {
  const navigate = useNavigate();
  const hospitalId = localStorage.getItem("hospital_id");

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [imagenUrl, setImagenUrl] = useState("");
  const [mensajePortada, setMensajePortada] = useState("");

  useEffect(() => {
    if (!hospitalId) return navigate("/");

    const fetchHospital = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/hospital/${hospitalId}`);
        if (!res.ok) throw new Error("No se pudo cargar hospital");

        const data = await res.json();
        setNombre(data.nombre || "");
        setDescripcion(data.descripcion || "");
        setUbicacion(data.ubicacion || "");
        setEspecialidades(data.especialidades || []);
        setImagenUrl(data.imagen_url || "");
      } catch (err) {
        console.error("❌ Error al cargar hospital:", err);
      }
    };

    fetchHospital();
  }, [hospitalId, navigate]);

  const handleAddEspecialidad = () => {
    setEspecialidades([...especialidades, { titulo: "", descripcion: "", link: "" }]);
  };

  const handleChangeEspecialidad = (index, field, value) => {
    const nuevas = [...especialidades];
    nuevas[index][field] = value;
    setEspecialidades(nuevas);
  };

  const handleRemoveEspecialidad = (index) => {
    const nuevas = especialidades.filter((_, i) => i !== index);
    setEspecialidades(nuevas);
  };

  const handlePortadaFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("archivo", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setImagenUrl(data.url);
      setMensajePortada("✅ Imagen de portada subida correctamente");
    } catch (err) {
      console.error("❌ Error al subir portada:", err);
      setMensajePortada("❌ Error al subir portada");
    }
  };

  const handleGuardar = async () => {
    const isValidUbicacion = ubicacion.startsWith("https://www.google.com/maps/embed?pb=");

    if (!ubicacion || !isValidUbicacion) {
      alert("La ubicación es obligatoria y debe ser un iframe válido de Google Maps.");
      return;
    }

    const payload = {
      nombre,
      descripcion,
      ubicacion,
      imagen_url: imagenUrl,
      especialidades,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/hospital/${hospitalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Perfil actualizado con éxito");
        navigate(`/hospitales/${hospitalId}`);
      } else {
        alert(data.message || "Error al guardar cambios");
      }
    } catch (err) {
      alert("Error de conexión");
    }
  };

  return (
    <div className="editar-perfil">
      <h2>Editar perfil del hospital</h2>

      <label>Nombre</label>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label>Descripción</label>
      <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

      <label>Ubicación (iframe de Google Maps)</label>
      <input
        value={ubicacion}
        onChange={(e) => {
          const value = e.target.value.trim();
          if (value.startsWith("<iframe")) {
            const match = value.match(/src="([^"]+)"/);
            if (match && match[1]) {
              setUbicacion(match[1]);
            } else {
              setUbicacion("");
            }
          } else {
            setUbicacion(value);
          }
        }}
        placeholder="https://www.google.com/maps/embed?pb=..."
        required
        className={
          ubicacion && !ubicacion.startsWith("https://www.google.com/maps/embed?pb=")
            ? "input-error"
            : ""
        }
      />

      <label>Especialidades</label>
      {especialidades.map((esp, index) => (
        <div key={index} className="card-editable">
          <input
            placeholder="Título"
            value={esp.titulo}
            onChange={(e) => handleChangeEspecialidad(index, "titulo", e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            value={esp.descripcion}
            onChange={(e) => handleChangeEspecialidad(index, "descripcion", e.target.value)}
          />
          <input
            placeholder="Link para turno"
            value={esp.link}
            onChange={(e) => handleChangeEspecialidad(index, "link", e.target.value)}
          />
          <button className="btn-eliminar" onClick={() => handleRemoveEspecialidad(index)}>
            🗑️ Eliminar
          </button>
        </div>
      ))}
      <button className="btn-agregar" onClick={handleAddEspecialidad}>
        ➕ Agregar especialidad
      </button>

      <label>Imagen de portada (URL)</label>
      <input
        type="text"
        value={imagenUrl}
        onChange={(e) => setImagenUrl(e.target.value)}
        placeholder="https://ejemplo.com/banner.jpg"
      />

      <label>Subir portada desde archivo</label>
      <input type="file" accept="image/*" onChange={handlePortadaFile} />

      {mensajePortada && <p className="mensaje-portada">{mensajePortada}</p>}

      <button className="guardar-btn" onClick={handleGuardar}>
        Guardar cambios
      </button>
    </div>
  );
}

export default EditarPerfilHospital;
