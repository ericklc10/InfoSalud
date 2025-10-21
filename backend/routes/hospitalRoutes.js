// import express from "express";
// import { actualizarPerfilHospital } from "../controllers/hospitalController.js";
// import fileUpload from "express-fileupload";

// const router = express.Router();

// router.use(fileUpload()); // para manejar archivos

// router.put("/:id", actualizarPerfilHospital);

// export default router;

////////////////////////////////////////////////

// import express from 'express';
// import {
//   registrarHospital,
//   actualizarPerfilHospital,
//   obtenerHospital
// } from '../controllers/hospitalController.js';

// const router = express.Router();

// // Rutas para hospitales
// router.post('/register', registrarHospital); // Registro
// router.put('/:id', actualizarPerfilHospital); // Edición
// router.get('/:id', obtenerHospital); // Vista pública

// export default router;
/////////////////////////////////////////////////////////////



import express from 'express';
import { obtenerHospital } from '../controllers/hospitalController.js';

const router = express.Router();

// Solo lectura
router.get('/:id', obtenerHospital);

export default router;
