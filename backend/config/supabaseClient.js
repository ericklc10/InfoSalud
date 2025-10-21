import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


console.log("Supabase URL:", process.env.SUPABASE_URL);
console.log("Supabase KEY:", process.env.SUPABASE_KEY);


export default supabase; // ✅ exportación por defecto
