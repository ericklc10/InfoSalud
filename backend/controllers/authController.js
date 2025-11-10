import supabase from "../config/supabaseClient.js";
import bcrypt from "bcrypt";

// =======================
// LOGIN compartido
// =======================
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
        id: usuario.id,
        avatar_url: usuario.avatar_url || null
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
        id: hospital.id,
        avatar_url: null 
      });
    }

    return res.status(404).json({ message: "Usuario no encontrado" });

  } catch (err) {
    console.error("❌ Error en login:", err.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// =======================
// REGISTRO de usuario normal
// =======================
export const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Verificar email en usuarios
    const { data: existenteEmailUsuario } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", email)
      .single();

    // Verificar email en hospitales
    const { data: existenteEmailHospital } = await supabase
      .from("hospitales")
      .select("id")
      .eq("email", email)
      .single();

    if (existenteEmailUsuario || existenteEmailHospital) {
      return res.status(409).json({ message: "Ya existe una cuenta con ese correo" });
    }

    // Hashear contraseña e insertar
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
    console.error("❌ Error en registro usuario:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// =======================
// REGISTRO de hospital
// =======================
export const registerHospital = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Verificar email en hospitales
    const { data: existenteEmailHospital } = await supabase
      .from("hospitales")
      .select("id")
      .eq("email", email)
      .single();

    // Verificar email en usuarios
    const { data: existenteEmailUsuario } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", email)
      .single();

    if (existenteEmailHospital || existenteEmailUsuario) {
      return res.status(409).json({ message: "Ya existe una cuenta con ese correo" });
    }

    // Hashear contraseña e insertar
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
    console.error("❌ Error en registro hospital:", err.message);
    res.status(500).json({ message: err.message });
  }
};
