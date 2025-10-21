import express from 'express';

import { loginUser, registerUser, registerHospital } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/register-hospital', registerHospital); // ✅ nueva ruta

export default router;

