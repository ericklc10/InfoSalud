// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './routes/authRoutes.js';
// import hospitalRoutes from './routes/hospitalRoutes.js';

// dotenv.config(); // primero cargamos variables

// const app = express(); // luego inicializamos express

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/hospital', hospitalRoutes); // ahora sí, después de declarar app

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en puerto ${PORT}`);
// });




import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Ajustá según tu frontend
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);       // Usuarios
app.use('/api/hospital', hospitalRoutes); // Hospitales

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
