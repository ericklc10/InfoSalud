import React, { useState, useEffect } from "react";
import "../estilos/SubirContenido.css";

function SubirContenido() {
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState("");
  const [imagenesSubidas, setImagenesSubidas] = useState([]);

  // Manejo de selección de archivo
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file)); // preview local
    }
  };

  // Subida de imagen al backend
  const handleSubir = async () => {
    if (!imagen) return alert("Seleccioná una imagen primero");

    const formData = new FormData();
    formData.append("archivo", imagen);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("✅ Imagen subida:", data);

      if (res.ok) {
        alert("Imagen subida con éxito");
        // Agregar nueva imagen a la galería
        setImagenesSubidas((prev) => [data.url, ...prev]);
        setImagen(null);
        setPreview("");
      } else {
        alert("Error al subir imagen: " + data.message);
      }
    } catch (err) {
      console.error("❌ Error al subir imagen:", err);
      alert("Error al subir imagen");
    }
  };

  // Cargar imágenes desde el backend
  const cargarImagenes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/images`);
      const data = await res.json();

      if (res.ok) {
        setImagenesSubidas(data.urls.reverse());
      } else {
        console.error("❌ Error al listar imágenes:", data.message);
      }
    } catch (err) {
      console.error("❌ Error al cargar imágenes:", err);
    }
  };

  // Ejecutar al montar el componente
  useEffect(() => {
    cargarImagenes();
  }, []);

  return (
    <div className="subir-contenido">
      <h2>📤 Subir imagen</h2>
      <input type="file" accept="image/*" onChange={handleImagenChange} />
      {preview && <img src={preview} alt="Preview" className="preview-img" />}
      <button onClick={handleSubir}>Subir</button>

      <h3>🖼️ Imágenes subidas</h3>
      <div className="galeria">
        {imagenesSubidas.map((url, i) => (
          <img key={i} src={url} alt={`img-${i}`} className="galeria-img" />
        ))}
      </div>
    </div>
  );
}

export default SubirContenido;
