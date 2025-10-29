
///usuariosController.js
import supabase from "../config/supabaseClient.js";

// GET /api/usuarios/:id
export const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  console.log("🔎 Buscando usuario con id:", id);

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: "Usuario no encontrado" });

  res.json(data);
};

// PUT /api/usuarios/:id
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { avatar_url, portada_url, biografia } = req.body;

  console.log("✏️ Actualizando usuario:", id, { avatar_url, portada_url, biografia });

  const { error } = await supabase
    .from("usuarios")
    .update({ avatar_url, portada_url, biografia })
    .eq("id", id);

  if (error) return res.status(500).json({ message: error.message });

  res.json({ message: "Perfil actualizado correctamente" });
};
