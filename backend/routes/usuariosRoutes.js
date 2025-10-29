
////usuariosRoutes.js


import express from "express";
import { obtenerUsuarioPorId, actualizarUsuario } from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/:id", obtenerUsuarioPorId);
router.put("/:id", actualizarUsuario);

export default router;
