import express from "express";
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
  buscarHospitales,
  puntuarEspecialidad,
  obtenerPromedioEspecialidad,
   obtenerPuntuacionUsuarioEspecialidad,
   obtenerEspecialidadesDestacadas,
   obtenerSeguidoresHospital,
   obtenerTotalResenas
} from "../controllers/hospitalController.js";

const router = express.Router();

// =======================
// Puntuación Especialidades
// =======================
router.post("/:hospitalId/especialidad/:espKey/puntuacion", puntuarEspecialidad);
router.get("/:hospitalId/especialidad/:espKey/promedio", obtenerPromedioEspecialidad);
router.get("/:hospitalId/especialidad/:espKey/puntuacion-usuario/:usuarioId", obtenerPuntuacionUsuarioEspecialidad);


// =======================
// Puntuación Hospital
// =======================
router.put("/:hospitalId/puntuacion-usuario", guardarPuntuacionUsuario);
router.get("/:hospitalId/puntuacion-usuario", obtenerPuntuacionUsuario);
router.get("/:hospitalId/promedio-puntuacion", obtenerPromedioPuntuacion);
router.get("/:hospitalId/total-resenas", obtenerTotalResenas);


// =======================
// Seguimiento
// =======================
router.get("/:hospitalId/seguimiento", verificarSeguimiento);
router.post("/:hospitalId/seguir", seguirHospital);
router.delete("/:hospitalId/seguir", dejarDeSeguirHospital);
router.get("/seguidos/:usuario_id", obtenerHospitalesSeguidos);
router.get("/:hospitalId/seguidores", obtenerSeguidoresHospital);


// =======================
// Hospitales destacados y buscador
// =======================
router.get("/destacados", obtenerHospitalesDestacados);
router.get("/buscar", buscarHospitales);

// =======================
// Especialidades destacadas 
// =======================
router.get("/especialidades/destacadas", obtenerEspecialidadesDestacadas);

// =======================
// Hospitales genéricos
// =======================
router.get("/", obtenerHospitales);
router.get("/:id", obtenerHospitalPorId);
router.put("/:id", actualizarHospital);
router.put("/:id/comentarios", agregarComentario);
router.put("/:id/puntuacion", actualizarPuntuacion);

export default router;
