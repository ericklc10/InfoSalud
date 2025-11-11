import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware base
app.use(cors());
app.use(express.json());

// ✅ Rutas oficiales con prefijo /api
app.use("/api/auth", authRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ Alias sin /api
app.use("/auth", authRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/usuarios", usuariosRoutes);

// ✅ Servir frontend (Vite build en /dist)
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Ruta raíz
app.get("/", (req, res) => {
  res.send("Backend InfoSalud+ está corriendo 🚀");
});

// ✅ Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// ✅ Manejo de errores globales
process.on("uncaughtException", (err) => {
  console.error("Excepción no capturada:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Promesa rechazada sin manejar:", reason);
});

console.log("✅ Rutas montadas y frontend servido correctamente");
