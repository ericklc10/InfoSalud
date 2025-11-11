import React, { useState, useEffect } from "react";
import PuntuacionEstrellas from "./PuntuacionEstrellas";
import "../estilos/PuntuacionForm.css";

function PuntuacionForm({ hospitalId, onPromedioActualizado, onTotalResenasActualizado }) {
  let usuario = null;

  try {
    const rawUsuario = localStorage.getItem("usuario");
    const rawHospital = localStorage.getItem("hospitalLogueado");

    const usuarioLogueado = rawUsuario ? JSON.parse(rawUsuario) : null;
    const hospitalLogueado = rawHospital ? JSON.parse(rawHospital) : null;

    usuario = usuarioLogueado || hospitalLogueado;
  } catch (e) {
    console.warn("⚠️ Error al parsear sesión:", e);
  }

  const [puntuacion, setPuntuacion] = useState(0);
  const [editando, setEditando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Cargar puntuación del usuario
  useEffect(() => {
    const cargarPuntuacion = async () => {
      if (!usuario || !usuario.id || !hospitalId) {
        console.warn("⚠️ Datos incompletos para cargar puntuación.");
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/puntuacion-usuario?usuario_id=${usuario.id}`
        );
        const data = await res.json();
        if (data.puntuacion) {
          setPuntuacion(data.puntuacion);
          setGuardado(true);
        }
      } catch (err) {
        console.error("❌ Error al cargar puntuación:", err);
      }
    };

    cargarPuntuacion();
  }, [hospitalId]);

  // ✅ Guardar puntuación
  const handleGuardar = async () => {
    setError(null);

    if (!usuario || !usuario.id || !hospitalId) {
      setError("⚠️ No se pudo identificar al usuario o al hospital.");
      return;
    }

    if (puntuacion < 1 || puntuacion > 5) {
      setError("⚠️ Seleccioná una puntuación válida.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/puntuacion-usuario`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario_id: usuario.id,
            puntuacion: puntuacion,
          }),
        }
      );

      if (!res.ok) throw new Error("Error al guardar puntuación");

      setGuardado(true);
      setEditando(false);

      // ✅ Refrescar promedio y total de reseñas después de guardar
      try {
        const resProm = await fetch(
          `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/promedio-puntuacion`
        );
        const dataProm = await resProm.json();
        if (onPromedioActualizado) {
          onPromedioActualizado(dataProm.promedio || null);
        }

        const resTotal = await fetch(
          `${import.meta.env.VITE_API_URL}/hospital/${hospitalId}/total-resenas`
        );
        const dataTotal = await resTotal.json();
        if (onTotalResenasActualizado) {
          onTotalResenasActualizado(dataTotal.total || 0);
        }
      } catch (err) {
        console.warn("⚠️ No se pudo actualizar promedio o reseñas:", err);
      }
    } catch (err) {
      console.error("❌ Error al guardar puntuación:", err);
      setError("No se pudo guardar la puntuación.");
    }
  };

  if (!hospitalId) {
    return <p className="info">⚠️ No se pudo cargar el hospital.</p>;
  }

  return (
    <div className="puntuacion-form">
      <h3>Puntuación del hospital</h3>

      {!usuario ? (
        <p className="info">⚠️ Iniciá sesión para puntuar este hospital.</p>
      ) : (
        <>
          {!guardado && !editando && (
            <p className="info">
              Este hospital aún no tiene puntuación registrada.
            </p>
          )}

          <PuntuacionEstrellas
            puntuacion={puntuacion}
            onChange={(valor) => {
              setPuntuacion(valor);
              setEditando(true);
            }}
          />

          {error && <p className="error">{error}</p>}

          {guardado && !editando ? (
            <button onClick={() => setEditando(true)}>Editar</button>
          ) : (
            <button onClick={handleGuardar}>Guardar</button>
          )}
        </>
      )}
    </div>
  );
}

export default PuntuacionForm;
