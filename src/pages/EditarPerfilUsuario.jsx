import React, { useState, useEffect } from "react";
import "../estilos/EditarPerfilUsuario.css";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditarPerfilUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [portadaUrl, setPortadaUrl] = useState("");
  const [biografia, setBiografia] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hospitalesSeguidos, setHospitalesSeguidos] = useState([]);

  // 🔄 Función reutilizable para cargar perfil
  const fetchPerfil = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${id}`);
      if (!res.ok) throw new Error("No se pudo cargar el perfil");

      const data = await res.json();
      setNombre(data.nombre || "usuario");
      setAvatarUrl(data.avatar_url || "");
      setPortadaUrl(data.portada_url || "");
      setBiografia(data.biografia || "Sin biografía aún");
    } catch (err) {
      console.error("Error al cargar perfil:", err.message);
      setError("No se pudo cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || id === "null") {
      alert("No se encontró información del perfil. Iniciá sesión de nuevo.");
      navigate("/login");
      return;
    }

    fetchPerfil();

    const fetchSeguidos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/seguidos/${id}`);
        const data = await res.json();
        setHospitalesSeguidos(data);
      } catch (err) {
        console.error("Error al cargar hospitales seguidos:", err);
      }
    };

    fetchSeguidos();
  }, [id, navigate]);

  // 📤 Subida genérica de imagen
  const subirImagen = async (file, setUrl, tipo) => {
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

      setUrl(data.url);
      alert(`${tipo} subido correctamente`);
    } catch (err) {
      console.error(`❌ Error al subir ${tipo}:`, err);
      alert(`Error al subir ${tipo}`);
    }
  };

  const handleAvatarFile = (e) => subirImagen(e.target.files[0], setAvatarUrl, "Avatar");
  const handlePortadaFile = (e) => subirImagen(e.target.files[0], setPortadaUrl, "Portada");

  const handleGuardar = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar_url: avatarUrl,
          portada_url: portadaUrl,
          biografia: biografia,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      alert("Cambios guardados correctamente");
      localStorage.setItem("avatar_url", avatarUrl);
      window.dispatchEvent(new Event("avatarActualizado"));
      await fetchPerfil(); // ✅ recarga datos actualizados
    } catch (err) {
      alert("Error al guardar: " + err.message);
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando perfil...</p>;
  if (error) return <p className="error text-danger text-center">{error}</p>;

  return (
    <div className="editar-perfil-container">
      {/* Portada */}
      <div
        className="portada mb-3 shadow-sm"
        style={{
          backgroundImage: portadaUrl ? `url(${portadaUrl})` : "none",
          backgroundColor: portadaUrl ? "transparent" : "#f0f0f0",
        }}
      ></div>

      {/* Info del perfil */}
      <div className="perfil-info">
        <img src={avatarUrl} alt="Avatar" className="avatar shadow-lg" />
        <h2 className="mt-2">@{nombre}</h2>
        <p className="text-muted">{biografia}</p>
      </div>

      {/* Formulario edición */}
      <div className="formulario-edicion card p-4 mt-4 shadow-sm">
        <h4 className="mb-3">Editar perfil</h4>

        <label className="form-label">URL del avatar</label>
        <input
          type="text"
          className="form-control"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />

        <label className="form-label mt-3">Subir avatar desde archivo</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleAvatarFile}
        />

        <label className="form-label mt-3">URL de portada</label>
        <input
          type="text"
          className="form-control"
          value={portadaUrl}
          onChange={(e) => setPortadaUrl(e.target.value)}
        />

        <label className="form-label mt-3">Subir portada desde archivo</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handlePortadaFile}
        />

        <label className="form-label mt-3">Escribe tu biografía</label>
        <textarea
          className="form-control"
          rows="3"
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
        />

        <div className="botones mt-4 d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={() => window.history.back()}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleGuardar}>
            Guardar cambios
          </button>
        </div>
      </div>

      {/* Hospitales seguidos */}
      <section className="hospitales-seguidos mt-4 card p-3 shadow-sm">
        <h3 className="mb-3">Hospitales que sigues</h3>
        {hospitalesSeguidos.length > 0 ? (
          <ul className="list-unstyled">
            {hospitalesSeguidos.map((h) => (
              <li key={h.id}>
                <Link to={`/hospitales/${h.id}`} className="hospital-link">
                  <img src={h.imagen_url} alt={h.nombre} />
                  <span>{h.nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No estás siguiendo ningún hospital aún.</p>
        )}
      </section>
    </div>
  );
}

export default EditarPerfilUsuario;
