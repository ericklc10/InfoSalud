// uploadController.js
import supabase from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

// 📤 Subir imagen
export const subirImagen = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No se recibió archivo" });
    }

    // Nombre único para evitar colisiones
    const nombreUnico = uuidv4() + "-" + file.originalname;

    // Subir a Supabase Storage (bucket "imagenes")
    const { error } = await supabase.storage
      .from("imagenes")
      .upload(nombreUnico, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error("❌ Error al subir a Supabase:", error.message);
      return res.status(500).json({ message: error.message });
    }

    // ✅ Obtener URL pública directamente desde Supabase
    const { data: publicUrl } = supabase.storage
      .from("imagenes")
      .getPublicUrl(nombreUnico);

    return res.status(200).json({ url: publicUrl.publicUrl });
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
      console.error("❌ Error al listar imágenes:", error.message);
      return res.status(500).json({ message: error.message });
    }

    // ✅ Generar URLs públicas con getPublicUrl
    const urls = data.map((img) => {
      const { data: publicUrl } = supabase.storage
        .from("imagenes")
        .getPublicUrl(img.name);
      return publicUrl.publicUrl;
    });

    return res.status(200).json({ urls });
  } catch (err) {
    console.error("❌ Error inesperado al listar:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
