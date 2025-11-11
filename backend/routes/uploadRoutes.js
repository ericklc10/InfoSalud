//uploadRoutes

import express from "express";
import multer from "multer";
import { subirImagen, listarImagenes } from "../controllers/uploadController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("archivo"), subirImagen);
router.get("/images", listarImagenes); // 👈 nuevo endpoint

export default router;
