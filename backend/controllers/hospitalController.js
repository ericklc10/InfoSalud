// import supabase from "../config/supabaseClient.js";

// import bcrypt from "bcrypt";
// import { uploadImageToStorage } from "../utils/storage.js";

// // 🏥 Registro de hospital
// export const registrarHospital = async (req, res) => {
//   try {
//     const { nombre, email, password } = req.body;

//     if (!nombre || !email || !password) {
//       return res.status(400).json({ message: "Faltan campos obligatorios" });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const { data, error } = await supabase
//       .from("hospitales")
//       .insert([{ nombre, email, password: hash }])
//       .select();

//     if (error) throw error;

//     res.status(201).json({ message: "Hospital registrado", id: data[0].id });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🖊️ Edición de perfil hospitalario
// export const actualizarPerfilHospital = async (req, res) => {
//   const hospitalId = req.params.id;

//   try {
//     const { nombre, descripcion } = req.body;
//     const especialidades = JSON.parse(req.body.especialidades || "[]");

//     let imagen_url = null;

//     // Subir imagen si se envió
//     if (req.files?.imagen) {
//       const file = req.files.imagen;
//       const nombreArchivo = `portadas/${hospitalId}-${Date.now()}.jpg`;

//       const { publicURL, error } = await uploadImageToStorage(file, nombreArchivo);
//       if (error) throw error;

//       imagen_url = publicURL;
//     }

//     const updateData = {
//       nombre,
//       descripcion,
//       especialidades,
//     };

//     if (imagen_url) updateData.imagen_url = imagen_url;

//     const { error: updateError } = await supabase
//       .from("hospitales")
//       .update(updateData)
//       .eq("id", hospitalId);

//     if (updateError) throw updateError;

//     res.status(200).json({ message: "Perfil actualizado con éxito" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔍 Obtener hospital por ID
// export const obtenerHospital = async (req, res) => {
//   const hospitalId = req.params.id;

//   try {
//     const { data, error } = await supabase
//       .from("hospitales")
//       .select("*")
//       .eq("id", hospitalId)
//       .single();

//     if (error) throw error;

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(404).json({ message: "Hospital no encontrado" });
//   }
// };

/////////////////////////////////////////////////////////////////////


// import supabase from "../config/supabaseClient.js";
// import bcrypt from "bcrypt";
// import { uploadImageToStorage } from "../utils/storage.js";

// // 🏥 Registro de hospital
// export const registrarHospital = async (req, res) => {
//   try {
//     const { nombre, email, password } = req.body;

//     if (!nombre || !email || !password) {
//       return res.status(400).json({ message: "Faltan campos obligatorios" });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const { data, error } = await supabase
//       .from("hospitales")
//       .insert([{ nombre, email, password: hash }])
//       .select();

//     if (error) throw error;

//     res.status(201).json({ message: "Hospital registrado", id: data[0].id, nombre: data[0].nombre });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🖊️ Edición de perfil hospitalario
// export const actualizarPerfilHospital = async (req, res) => {
//   const hospitalId = req.params.id;

//   try {
//     const { nombre, descripcion } = req.body;
//     const especialidades = JSON.parse(req.body.especialidades || "[]");

//     let imagen_url = null;

//     if (req.files?.imagen) {
//       const file = req.files.imagen;
//       const nombreArchivo = `portadas/${hospitalId}-${Date.now()}.jpg`;

//       const { publicURL, error } = await uploadImageToStorage(file, nombreArchivo);
//       if (error) throw error;

//       imagen_url = publicURL;
//     }

//     const updateData = {
//       nombre,
//       descripcion,
//       especialidades,
//     };

//     if (imagen_url) updateData.imagen_url = imagen_url;

//     const { error: updateError } = await supabase
//       .from("hospitales")
//       .update(updateData)
//       .eq("id", hospitalId);

//     if (updateError) throw updateError;

//     res.status(200).json({ message: "Perfil actualizado con éxito" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔍 Obtener hospital por ID
// export const obtenerHospital = async (req, res) => {
//   const hospitalId = req.params.id;

//   try {
//     const { data, error } = await supabase
//       .from("hospitales")
//       .select("*")
//       .eq("id", hospitalId)
//       .single();

//     if (error || !data) throw error;

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(404).json({ message: "Hospital no encontrado" });
//   }
// };



////////////////////////////////////////////////


import supabase from "../config/supabaseClient.js";

// 🔍 Obtener hospital por ID
export const obtenerHospital = async (req, res) => {
  const hospitalId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("hospitales")
      .select("*")
      .eq("id", hospitalId)
      .single();

    if (error || !data) throw error;

    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: "Hospital no encontrado" });
  }
};
