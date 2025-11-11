//uploadController

import supabase from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

// 📤 Subir imagen
export const subirImagen = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No se recibió archivo" });
    }

    const nombreUnico = uuidv4() + "-" + file.originalname;

    const { error } = await supabase.storage
      .from("imagenes")
      .upload(nombreUnico, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/imagenes/${nombreUnico}`;
    return res.status(200).json({ url });
  } catch (err) {
    console.error("❌ Error inesperado al subir:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// 📂 Listar imágenes
export const listarImagenes = async (req, res) => {
  try {
    const { data, error } = await supabase.storage
      .from("imagenes")
      .list("", { limit: 100 });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    // Generar URLs públicas
    const urls = data.map(
      (img) =>
        `${process.env.SUPABASE_URL}/storage/v1/object/public/imagenes/${img.name}`
    );

    return res.status(200).json({ urls });
  } catch (err) {
    console.error("❌ Error inesperado al listar:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
