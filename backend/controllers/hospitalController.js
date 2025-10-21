import supabase from "../config/supabaseClient.js";


export const obtenerHospitalPorId = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("hospitales")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};



