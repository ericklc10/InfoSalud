////server.js


// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

// ✅ Habilitar CORS para Netlify
app.use(cors());


app.use(express.json());

// ✅ Rutas
app.use('/api/auth', authRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/usuarios', usuariosRoutes);

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

process.on("unhandledRejection", (reason, promise) => {
  console.error("Promesa rechazada sin manejar:", reason);
});

console.log("✅ Rutas montadas: /api/auth, /api/hospital, /api/usuarios");
