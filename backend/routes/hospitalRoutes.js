import express from "express";
import { obtenerHospitalPorId } from "../controllers/hospitalController.js";

const router = express.Router();

// Endpoint dinámico para obtener hospital por ID
router.get("/:id", obtenerHospitalPorId);

export default router;
