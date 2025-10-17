import supabase from "../config/supabaseClient.js";

export const uploadImageToStorage = async (file, path) => {
  const { data, error } = await supabase.storage
    .from("imagenes") // nombre del bucket
    .upload(path, file.data, {
      contentType: file.mimetype,
      upsert: true
    });

  if (error) return { error };

  const { publicUrl } = supabase.storage
    .from("imagenes")
    .getPublicUrl(path);

  return { publicURL: publicUrl };
};

