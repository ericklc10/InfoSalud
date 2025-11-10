import React, { useState, useEffect } from "react";
import "../estilos/EditarPerfilUsuario.css";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


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

  useEffect(() => {
    if (!id || id === "null") {
      alert("No se encontró información del perfil. Iniciá sesión de nuevo.");
      navigate("/login");
      return;
    }

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

    const fetchSeguidos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/seguidos/${id}`);
        const data = await res.json();
        setHospitalesSeguidos(data);
      } catch (err) {
        console.error("Error al cargar hospitales seguidos:", err);
      }
    };

    fetchPerfil();
    fetchSeguidos();
  }, [id, navigate]);

  const handleGuardar = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar_url: avatarUrl,
          portada_url: portadaUrl,
          biografia: biografia
        })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      alert("Cambios guardados correctamente");
      localStorage.setItem("avatar_url", avatarUrl);
      window.dispatchEvent(new Event("avatarActualizado"));
    } catch (err) {
      alert("Error al guardar: " + err.message);
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="editar-perfil-container">
      <div className="portada" style={{ backgroundImage: `url(${portadaUrl})` }}></div>
      <div className="perfil-info">
        <img src={avatarUrl} alt="Avatar" className="avatar" />
        <h2>@{nombre}</h2>
        <p>{biografia}</p>
      </div>

      <div className="formulario-edicion">
        <label>URL del avatar</label>
        <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />

        <label>URL de portada</label>
        <input type="text" value={portadaUrl} onChange={(e) => setPortadaUrl(e.target.value)} />

        <label>Escribe tu biografía</label>
        <textarea value={biografia} onChange={(e) => setBiografia(e.target.value)} />

        <div className="botones">
          <button onClick={() => window.history.back()}>Cancelar</button>
          <button onClick={handleGuardar}>Guardar cambios</button>
        </div>
      </div>

      <section className="hospitales-seguidos">
        <h3>Hospitales que sigues</h3>
        {hospitalesSeguidos.length > 0 ? (
          <ul>
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
          <p>No estás siguiendo ningún hospital aún.</p>
        )}
      </section>
    </div>
  );
}

export default EditarPerfilUsuario;
