import supabase from "../config/supabaseClient.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, data.password);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = "token_simulado_" + data.id;

    res.status(200).json({
  message: "Inicio de sesión exitoso",
  token,
  nombre: data.nombres // 👈 si en Supabase el campo se llama "nombres"
});

  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/////////////////////////

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
  nombre: data[0].nombre
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};