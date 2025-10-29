import express from "express";
const router = express.Router();

import {
  obtenerHospitales,
  obtenerHospitalPorId,
  actualizarHospital,
  agregarComentario,
  actualizarPuntuacion,
  obtenerPromedioPuntuacion,
  guardarPuntuacionUsuario,
  obtenerPuntuacionUsuario,
  verificarSeguimiento,
  seguirHospital,
  dejarDeSeguirHospital,
  obtenerHospitalesSeguidos,
  obtenerHospitalesDestacados,
  buscarHospitales
} from "../controllers/hospitalController.js";

// =======================
// Rutas específicas primero (para evitar conflictos)
// =======================

// Guardar o actualizar puntuación por usuario
router.put("/:hospitalId/puntuacion-usuario", guardarPuntuacionUsuario);

// Obtener puntuación del usuario actual
router.get("/:hospitalId/puntuacion-usuario", obtenerPuntuacionUsuario);

// Obtener promedio de puntuaciones del hospital
router.get("/:hospitalId/promedio-puntuacion", obtenerPromedioPuntuacion);

// Seguimiento: verificar, seguir, dejar de seguir
router.get("/:hospitalId/seguimiento", verificarSeguimiento);
router.post("/:hospitalId/seguir", seguirHospital);
router.delete("/:hospitalId/seguir", dejarDeSeguirHospital);

// Obtener hospitales seguidos por usuario
router.get("/seguidos/:usuario_id", obtenerHospitalesSeguidos);

// =======================
// Hospitales destacados y buscador (antes de :id)
// =======================
router.get("/destacados", obtenerHospitalesDestacados);
router.get("/buscar", buscarHospitales);

// =======================
// Rutas genéricas al final
// =======================

// Listado de hospitales
router.get("/", obtenerHospitales);

// Obtener hospital por UUID
router.get("/:id", obtenerHospitalPorId);

// Actualizar hospital por UUID
router.put("/:id", actualizarHospital);

// Agregar comentario por UUID
router.put("/:id/comentarios", agregarComentario);

// Actualizar puntuación directa (no recomendada)
router.put("/:id/puntuacion", actualizarPuntuacion);

export default router;
