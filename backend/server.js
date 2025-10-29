////server.js


import express from 'express';


import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js'; // ✅ nueva ruta

import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/usuarios', usuariosRoutes); // ✅ nueva ruta montada

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Excepción no capturada:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Promesa rechazada sin manejar:", reason);
});

console.log("✅ Rutas montadas: /api/auth, /api/hospital, /api/usuarios");
