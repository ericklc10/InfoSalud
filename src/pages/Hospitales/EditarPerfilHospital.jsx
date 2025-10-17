import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../estilos/EditarPerfilHospital.css";


function EditarPerfilHospital() {
  const navigate = useNavigate();
  const hospitalId = localStorage.getItem("hospital_id");

  const [hospital, setHospital] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    if (!hospitalId) return navigate("/");

    const fetchHospital = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/${hospitalId}`);
        const data = await res.json();
        setHospital(data);
        setNombre(data.nombre);
        setDescripcion(data.descripcion);
        setEspecialidades(data.especialidades || []);
      } catch (err) {
        console.error("Error al cargar hospital:", err);
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

  const handleGuardar = async () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("especialidades", JSON.stringify(especialidades));
    if (imagen) formData.append("imagen", imagen);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/hospital/${hospitalId}`, {
        method: "PUT",
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert("Perfil actualizado con éxito");
        navigate(`/hospital/${hospitalId}`);
      } else {
        alert(data.message || "Error al guardar cambios");
      }
    } catch (err) {
      alert("Error de conexión");
    }
  };

  return (
    <div className="editar-perfil">
      <h2>Editar perfil</h2>

      <label>Nombre</label>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label>Descripción</label>
      <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

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
          <button onClick={() => handleRemoveEspecialidad(index)}>🗑️ Eliminar</button>
        </div>
      ))}
      <button onClick={handleAddEspecialidad}>➕ Agregar especialidad</button>

      <label>Imagen de portada</label>
      <input type="file" onChange={(e) => setImagen(e.target.files[0])} />

      <button className="guardar-btn" onClick={handleGuardar}>Guardar cambios</button>
    </div>
  );
}

export default EditarPerfilHospital;
