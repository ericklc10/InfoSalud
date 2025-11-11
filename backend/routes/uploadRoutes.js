// routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import { subirImagen, listarImagenes } from "../controllers/uploadController.js";

const router = express.Router();

// ✅ Configurar multer para recibir archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Ruta POST /api/upload
router.post("/", upload.single("archivo"), subirImagen);

// ✅ Ruta GET /api/upload/images
router.get("/images", listarImagenes);

export default router;
