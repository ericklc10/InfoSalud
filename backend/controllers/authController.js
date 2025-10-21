import supabase from "../config/supabaseClient.js";
import bcrypt from "bcrypt";

// LOGIN compartido
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar en usuarios
    const { data: usuario } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .single();

    if (usuario) {
      const match = await bcrypt.compare(password, usuario.password);
      if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

      const token = "token_simulado_" + usuario.id;
      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        nombre: usuario.nombre,
        tipo: "usuario",
        id: usuario.id
      });
    }

    // Buscar en hospitales
    const { data: hospital } = await supabase
      .from("hospitales")
      .select("*")
      .eq("email", email)
      .single();

    if (hospital) {
      const match = await bcrypt.compare(password, hospital.password);
      if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

      const token = "token_simulado_" + hospital.id;
      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        nombre: hospital.nombre,
        tipo: "hospital",
        id: hospital.id
      });
    }

    return res.status(404).json({ message: "Usuario no encontrado" });

  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// REGISTRO de usuario normal
export const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nombre, email, password: hash }])
      .select();

    if (error) throw error;

    const token = "token_simulado_" + data[0].id;
    res.status(201).json({
      message: "Usuario registrado",
      token,
      nombre: data[0].nombre,
      tipo: "usuario",
      id: data[0].id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};









export const registerHospital = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("hospitales")
      .insert([{ nombre, email, password: hash }])
      .select();

    if (error) throw error;

    const token = "token_simulado_" + data[0].id;
    res.status(201).json({
      message: "Hospital registrado",
      token,
      nombre: data[0].nombre,
      tipo: "hospital",
      id: data[0].id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
