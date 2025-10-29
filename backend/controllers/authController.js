import supabase from "../config/supabaseClient.js";
import bcrypt from "bcrypt";

// =======================
// LOGIN compartido
// =======================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar en tabla usuarios
    const { data: usuario, error: userError } = await supabase
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
        avatar_url: usuario.avatar_url || ""
      });
    }

    // Buscar en tabla hospitales
    const { data: hospital, error: hospitalError } = await supabase
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

    // Verificar si ya existe el email en usuarios
    const { data: existenteEmail } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", email)
      .single();

    if (existenteEmail) {
      return res.status(409).json({ message: "Ya existe una cuenta con ese correo" });
    }

    // Verificar si ya existe el email en hospitales
    const { data: emailEnHospital } = await supabase
      .from("hospitales")
      .select("id")
      .eq("email", email)
      .single();

    if (emailEnHospital) {
      return res.status(409).json({ message: "Ya existe una cuenta con ese correo" });
    }

    // Verificar si ya existe el nombre
    const { data: existenteNombre } = await supabase
      .from("usuarios")
      .select("id")
      .eq("nombre", nombre)
      .single();

    if (existenteNombre) {
      return res.status(409).json({ message: "Ese nombre de usuario ya está en uso" });
    }

    // Hashear contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar en tabla usuarios
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nombre, email, password: hash }])
      .select();

    if (error) throw error;

    const token = "token_simulado_" + data[0].id;
    res.status(201).json({
      message: "Usuario registrado correctamente",
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

    // Verificar si ya existe el email en hospitales
    const { data: existenteEmail } = await supabase
      .from("hospitales")
      .select("id")
      .eq("email", email)
      .single();

    if (existenteEmail) {
      return res.status(409).json({ message: "Ya existe una cuenta con ese correo" });
    }

    // Verificar si ya existe el email en usuarios
    const { data: emailEnUsuario } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", email)
      .single();

    if (emailEnUsuario) {
      return res.status(409).json({ message: "Ya existe una cuenta con ese correo" });
    }

    // Hashear contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar en tabla hospitales
    const { data, error } = await supabase
      .from("hospitales")
      .insert([{ nombre, email, password: hash }])
      .select();

    if (error) throw error;

    const token = "token_simulado_" + data[0].id;
    res.status(201).json({
      message: "Hospital registrado correctamente",
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
