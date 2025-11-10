//hospitalController

import supabase from "../config/supabaseClient.js";

// =======================
// Obtener hospital por ID (UUID)
// =======================
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

// =======================
// Actualizar hospital por ID (UUID)
// =======================
export const actualizarHospital = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, ubicacion, imagen_url, especialidades } = req.body;

  try {
    const { error } = await supabase
      .from("hospitales")
      .update({
        nombre,
        descripcion,
        ubicacion,
        imagen_url,
        especialidades
      })
      .eq("id", id);

    if (error) throw error;

    res.json({ message: "Hospital actualizado correctamente" });
  } catch (err) {
    console.error("❌ Error al actualizar hospital:", err.message);
    res.status(500).json({ message: "Error al actualizar hospital" });
  }
};


// =======================
// Obtener listado de hospitales con promedio
// =======================
export const obtenerHospitales = async (req, res) => {
  try {
    const { data: hospitales, error } = await supabase
      .from("hospitales")
      .select("id, nombre, imagen_url");

    if (error) throw error;

    const hospitalesConPromedio = await Promise.all(
      hospitales.map(async (h) => {
        const { data: puntuaciones } = await supabase
          .from("puntuaciones")
          .select("puntuacion")
          .eq("hospital_id", h.id);

        const promedio =
          puntuaciones && puntuaciones.length > 0
            ? puntuaciones.reduce((acc, p) => acc + p.puntuacion, 0) /
              puntuaciones.length
            : null;

        return { ...h, promedio };
      })
    );

    res.json(hospitalesConPromedio);
  } catch (err) {
    console.error("❌ Error en obtenerHospitales:", err.message);
    res.status(500).json({ error: "Error al obtener hospitales" });
  }
};




// =======================
// Obtener hospitales destacados (top 4 por promedio)
// =======================
export const obtenerHospitalesDestacados = async (req, res) => {
  try {
    const { data: hospitales, error } = await supabase
      .from("hospitales")
      .select("id, nombre, imagen_url");

    if (error) throw error;

    const hospitalesConPromedio = await Promise.all(
      hospitales.map(async (h) => {
        const { data: puntuaciones } = await supabase
          .from("puntuaciones")
          .select("puntuacion")
          .eq("hospital_id", h.id);

        const promedio =
          puntuaciones && puntuaciones.length > 0
            ? puntuaciones.reduce((acc, p) => acc + p.puntuacion, 0) /
              puntuaciones.length
            : null;

        return { ...h, promedio };
      })
    );

    // Ordenar por promedio DESC y limitar a 4
    const destacados = hospitalesConPromedio
      .sort((a, b) => (b.promedio || 0) - (a.promedio || 0))
      .slice(0, 4);

    res.json(destacados);
  } catch (err) {
    console.error("❌ Error en obtenerHospitalesDestacados:", err.message);
    res.status(500).json({ error: "Error al obtener hospitales destacados" });
  }
};



// =======================
// Agregar comentario por hospital ID
// =======================
export const agregarComentario = async (req, res) => {
  const { id } = req.params;
  const { autor, texto, fecha, puntuacion, usuarioId } = req.body;

  try {
    // 1. Buscar avatar_url del usuario
    const { data: usuario, error: userError } = await supabase
      .from("usuarios")
      .select("avatar_url")
      .eq("id", usuarioId)
      .single();

    if (userError) {
      console.error("❌ Error al obtener usuario:", userError.message);
      return res.status(500).json({ error: "Error al obtener usuario" });
    }

    // 2. Armar el nuevo comentario con avatar incluido
    const nuevoComentario = {
      autor,
      texto,
      fecha,
      puntuacion,
      avatar_url: usuario?.avatar_url || null, // ✅ foto de perfil del usuario
    };

    // 3. Obtener comentarios actuales del hospital
    const { data: hospital, error: fetchError } = await supabase
      .from("hospitales")
      .select("comentarios")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("❌ Error al obtener hospital:", fetchError.message);
      return res.status(500).json({ error: "Error al obtener hospital" });
    }

    const comentariosActualizados = Array.isArray(hospital.comentarios)
      ? [...hospital.comentarios, nuevoComentario]
      : [nuevoComentario];

    // 4. Guardar comentarios actualizados
    const { error: updateError } = await supabase
      .from("hospitales")
      .update({ comentarios: comentariosActualizados })
      .eq("id", id);

    if (updateError) {
      console.error("❌ Error al actualizar hospital:", updateError.message);
      return res.status(500).json({ error: "Error al actualizar hospital" });
    }

    res.json({
      message: "Comentario agregado",
      comentarios: comentariosActualizados,
    });
  } catch (err) {
    console.error("❌ Error inesperado:", err.message);
    res.status(500).json({ error: "Error al agregar comentario" });
  }
};


// =======================
// Actualizar puntuación directa en hospital (no recomendada)
// =======================
export const actualizarPuntuacion = async (req, res) => {
  const { id } = req.params;
  const { puntuacion } = req.body;

  if (typeof puntuacion !== "number" || puntuacion < 1 || puntuacion > 5) {
    return res.status(400).json({ error: "Puntuación inválida" });
  }

  const { error } = await supabase
    .from("hospitales")
    .update({ puntuacion })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: "Puntuación actualizada correctamente", puntuacion });
};

// =======================
// Guardar o actualizar puntuación por usuario
// =======================
export const guardarPuntuacionUsuario = async (req, res) => {
  const { hospitalId } = req.params;
  const { usuario_id, puntuacion } = req.body;

  console.log("📥 Datos recibidos:", { hospitalId, usuario_id, puntuacion });

  if (!hospitalId || !usuario_id || typeof puntuacion !== "number") {
    return res.status(400).json({ error: "Datos incompletos o inválidos" });
  }

  if (puntuacion < 1 || puntuacion > 5) {
    return res.status(400).json({ error: "Puntuación fuera de rango (1-5)" });
  }

  try {
    const { data: existente, error: fetchError } = await supabase
      .from("puntuaciones")
      .select("*")
      .eq("hospital_id", hospitalId)
      .eq("usuario_id", usuario_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("❌ Error al buscar puntuación existente:", fetchError.message);
      return res.status(500).json({ error: fetchError.message });
    }

    let resultado;
    if (existente) {
      console.log("🔄 Actualizando puntuación existente...");
      const { data, error } = await supabase
        .from("puntuaciones")
        .update({ puntuacion, fecha: new Date().toISOString() })
        .eq("hospital_id", hospitalId)
        .eq("usuario_id", usuario_id);

      console.log("🧾 Resultado del update:", data);

      if (!data || data.length === 0) {
        console.warn("⚠️ El update no modificó ninguna fila.");
      }

      if (error) throw error;
      resultado = data;
    } else {
      console.log("🆕 Insertando nueva puntuación...");
      const { data, error } = await supabase
        .from("puntuaciones")
        .insert([
          {
            hospital_id: hospitalId,
            usuario_id,
            puntuacion,
            fecha: new Date().toISOString()
          }
        ]);
      if (error) throw error;
      resultado = data;
    }

    res.json({ message: "Puntuación guardada", puntuacion: resultado });
  } catch (err) {
    console.error("❌ Error al guardar puntuación:", err.message);
    res.status(500).json({ error: "No se pudo guardar la puntuación" });
  }
};


// =======================
// Obtener puntuación del usuario actual
// =======================
export const obtenerPuntuacionUsuario = async (req, res) => {
  const { hospitalId } = req.params;
  const { usuario_id } = req.query;

  if (!usuario_id) {
    return res.status(400).json({ error: "Falta el ID del usuario" });
  }

  try {
    const { data, error } = await supabase
      .from("puntuaciones")
      .select("puntuacion")
      .eq("hospital_id", hospitalId)
      .eq("usuario_id", usuario_id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("❌ Error al obtener puntuación:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.json({ puntuacion: data?.puntuacion || null });
  } catch (err) {
    console.error("❌ Error inesperado al obtener puntuación:", err.message);
    res.status(500).json({ error: "Error inesperado al obtener puntuación" });
  }
};

// =======================
// Calcular promedio de puntuaciones por hospital
// =======================
export const obtenerPromedioPuntuacion = async (req, res) => {
  const { hospitalId } = req.params;

  try {
    const { data, error } = await supabase
      .from("puntuaciones")
      .select("puntuacion")
      .eq("hospital_id", hospitalId);

    if (error) {
      console.error("❌ Error al calcular promedio:", error.message);
      return res.status(500).json({ error: error.message });
    }

    const promedio =
      data.length > 0
        ? data.reduce((acc, p) => acc + p.puntuacion, 0) / data.length
        : null;

    res.json({ promedio });
  } catch (err) {
    console.error("❌ Error inesperado al calcular promedio:", err.message);
    res.status(500).json({ error: "Error inesperado al calcular promedio" });
  }
};

// =======================
// Seguir hospital
// =======================
export const seguirHospital = async (req, res) => {
  const { hospitalId } = req.params;
  const { usuario_id } = req.body;

  console.log("📥 Datos recibidos en seguirHospital:", { hospitalId, usuario_id });

  if (!hospitalId || !usuario_id) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  if (typeof hospitalId !== "string" || typeof usuario_id !== "string") {
    return res.status(400).json({ error: "Formato inválido de ID" });
  }

  if (hospitalId === usuario_id) {
    return res.status(400).json({ error: "No puedes seguir tu propio hospital" });
  }

  const { data: existente, error: fetchError } = await supabase
    .from("seguimientos")
    .select("id")
    .eq("hospital_id", hospitalId)
    .eq("usuario_id", usuario_id)
    .single();

  console.log("🔍 Resultado de búsqueda:", { existente, fetchError });

  if (fetchError && fetchError.code !== "PGRST116") {
    return res.status(500).json({ error: fetchError.message });
  }

  if (existente) {
    return res.status(200).json({ message: "Ya estás siguiendo este hospital" });
  }

  const { data, error } = await supabase
    .from("seguimientos")
    .insert([{ hospital_id: hospitalId, usuario_id, fecha: new Date().toISOString() }]);

  if (error) {
    console.error("❌ Error al insertar seguimiento:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Hospital seguido", seguimiento: data });
};

// =======================
// Dejar de seguir hospital
// =======================
export const dejarDeSeguirHospital = async (req, res) => {
  const { hospitalId } = req.params;
  const { usuario_id } = req.body;

  console.log("📤 Solicitud para dejar de seguir:", { hospitalId, usuario_id });

  if (!hospitalId || !usuario_id) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  if (typeof hospitalId !== "string" || typeof usuario_id !== "string") {
    return res.status(400).json({ error: "Formato inválido de ID" });
  }

  const { error } = await supabase
    .from("seguimientos")
    .delete()
    .eq("hospital_id", hospitalId)
    .eq("usuario_id", usuario_id);

  if (error) {
    console.error("❌ Error al eliminar seguimiento:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Seguimiento eliminado" });
};

// =======================
// Verificar seguimiento
// =======================
export const verificarSeguimiento = async (req, res) => {
  const { hospitalId } = req.params;
  const { usuario_id } = req.query;

  if (!hospitalId || !usuario_id) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const { data, error } = await supabase
    .from("seguimientos")
    .select("id")
    .eq("hospital_id", hospitalId)
    .eq("usuario_id", usuario_id)
    .single();

  if (error && error.code !== "PGRST116") {
    return res.status(500).json({ error: error.message });
  }

  res.json({ siguiendo: !!data });
};

//obtener Hospitales Seguidos
export const obtenerHospitalesSeguidos = async (req, res) => {
  const { usuario_id } = req.params;

  if (!usuario_id) {
    return res.status(400).json({ error: "Falta el ID del usuario" });
  }

  const { data: seguimientos, error } = await supabase
    .from("seguimientos")
    .select("hospital_id")
    .eq("usuario_id", usuario_id);

  if (error) return res.status(500).json({ error: error.message });

  const hospitalIds = seguimientos.map((s) => s.hospital_id);

  const { data: hospitales, error: fetchError } = await supabase
    .from("hospitales")
    .select("id, nombre, imagen_url")
    .in("id", hospitalIds);

  if (fetchError) return res.status(500).json({ error: fetchError.message });

  res.json(hospitales);
};


// =======================
// Buscar hospitales por nombre o especialidad
// =======================
export const buscarHospitales = async (req, res) => {
  const { query } = req.query;

  if (!query || !query.trim()) return res.json([]);

  try {
    // Búsqueda por nombre (coincidencia parcial, case-insensitive)
    const { data: porNombre, error: errNombre } = await supabase
      .from("hospitales")
      .select("id, nombre, imagen_url, especialidades")
      .ilike("nombre", `%${query}%`);

    if (errNombre) throw errNombre;

    // Búsqueda por especialidades (si la columna es un array JSON)
    const { data: todos, error: errTodos } = await supabase
      .from("hospitales")
      .select("id, nombre, imagen_url, especialidades");

    if (errTodos) throw errTodos;

    const porEspecialidad = (todos || []).filter(h => {
  const esp = Array.isArray(h.especialidades) ? h.especialidades : [];
  return esp.some(e =>
    (e.titulo && e.titulo.toLowerCase().includes(query.toLowerCase())) ||
    (e.id && e.id.toLowerCase().includes(query.toLowerCase()))
  );
});


    // Unir resultados (evitar duplicados por id)
    const mapa = new Map();
    [...(porNombre || []), ...porEspecialidad].forEach(h => mapa.set(h.id, h));

    res.json([...mapa.values()]);
  } catch (err) {
    console.error("❌ Error en buscarHospitales:", err.message);
    res.status(500).json({ error: "Error en búsqueda" });
  }
};


//hospitalController:

// =======================
// Puntuación Especialidades
// =======================

// Guardar o actualizar puntuación de una especialidad
// Guardar o actualizar puntuación de una especialidad
export const puntuarEspecialidad = async (req, res) => {
  const { hospitalId, espKey } = req.params; // 👈 espKey ahora es el titulo
  const { usuarioId, puntuacion } = req.body;

  try {
    const { data: existente } = await supabase
      .from("especialidad_puntuaciones")
      .select("*")
      .eq("usuario_id", usuarioId)
      .eq("hospital_id", hospitalId)
      .eq("especialidad_key", espKey) // guarda el titulo
      .single();

    if (existente) {
      await supabase
        .from("especialidad_puntuaciones")
        .update({ puntuacion, updated_at: new Date() })
        .eq("id", existente.id);
    } else {
      await supabase
        .from("especialidad_puntuaciones")
        .insert([
          {
            hospital_id: hospitalId,
            usuario_id: usuarioId,
            especialidad_key: espKey, // 👈 titulo
            puntuacion,
          },
        ]);
    }

    // calcular promedio actualizado
    const { data: promedioData } = await supabase
      .from("especialidad_puntuaciones")
      .select("puntuacion")
      .eq("hospital_id", hospitalId)
      .eq("especialidad_key", espKey);

    const promedio =
      promedioData.reduce((acc, cur) => acc + cur.puntuacion, 0) /
      promedioData.length;

    res.json({ message: "Puntuación guardada", promedio });
  } catch (err) {
    console.error("Error en puntuarEspecialidad:", err);
    res.status(500).json({ message: "Error al guardar puntuación" });
  }
};


// Obtener promedio y cantidad de una especialidad
export const obtenerPromedioEspecialidad = async (req, res) => {
  const { hospitalId, espKey } = req.params;

  try {
    const { data } = await supabase
      .from("especialidad_puntuaciones")
      .select("puntuacion")
      .eq("hospital_id", hospitalId)
      .eq("especialidad_key", espKey);

    if (!data || data.length === 0) {
      return res.json({ promedio: null, cantidad: 0 });
    }

    const cantidad = data.length;
    const promedio =
      data.reduce((acc, cur) => acc + cur.puntuacion, 0) / cantidad;

    res.json({ promedio, cantidad });
  } catch (err) {
    console.error("Error en obtenerPromedioEspecialidad:", err);
    res.status(500).json({ message: "Error al obtener promedio" });
  }
};




// GET /hospital/:hospitalId/especialidad/:espKey/puntuacion-usuario/:usuarioId
export const obtenerPuntuacionUsuarioEspecialidad = async (req, res) => {
  const { hospitalId, espKey, usuarioId } = req.params;

  try {
    const { data } = await supabase
      .from("especialidad_puntuaciones")
      .select("puntuacion")
      .eq("hospital_id", hospitalId)
      .eq("especialidad_key", espKey)
      .eq("usuario_id", usuarioId)
      .single();

    if (!data) {
      return res.json({ puntuacion: null });
    }

    res.json({ puntuacion: data.puntuacion });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener puntuación del usuario" });
  }
};


//========================================
// Obtener especialidades destacadas (top rankeadas de todos los hospitales)
//========================================
export const obtenerEspecialidadesDestacadas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("especialidad_puntuaciones")
      .select("hospital_id, especialidad_key, puntuacion");

    if (error) throw error;

    // Agrupar por hospital + especialidad
    // Agrupar por hospital + especialidad
const agrupadas = {};
data.forEach((row) => {
  const key = `${row.hospital_id}::${row.especialidad_key}`; // usar separador único "::"
  if (!agrupadas[key]) {
    agrupadas[key] = { total: 0, count: 0, hospitalId: row.hospital_id, espKey: row.especialidad_key };
  }
  agrupadas[key].total += row.puntuacion;
  agrupadas[key].count += 1;
});

// Calcular promedio y rescatar nombres
const resultados = await Promise.all(
  Object.values(agrupadas).map(async (val) => {
    const { hospitalId, espKey } = val;

    // Buscar hospital
    const { data: hospitalData } = await supabase
      .from("hospitales")
      .select("nombre, especialidades")
      .eq("id", hospitalId)
      .single();

    let nombreHospital = hospitalData?.nombre || "Hospital desconocido";
    let nombreEspecialidad = espKey;

    // Parsear JSON de especialidades
    if (hospitalData?.especialidades) {
      let lista;
      try {
        lista =
          typeof hospitalData.especialidades === "string"
            ? JSON.parse(hospitalData.especialidades)
            : hospitalData.especialidades;

        const esp = lista.find(
          (e) =>
            e.id?.toLowerCase() === espKey.toLowerCase() ||
            e.titulo?.toLowerCase() === espKey.toLowerCase()
        );
        if (esp) nombreEspecialidad = esp.titulo || esp.id;
      } catch (err) {
        console.warn("⚠️ Error parseando especialidades:", err);
      }
    }

    return {
      hospitalId,
      nombreHospital,
      espKey,
      nombreEspecialidad,
      promedio: val.total / val.count,
      cantidad: val.count,
    };
  })
);


    resultados.sort((a, b) => b.promedio - a.promedio);

    res.json(resultados.slice(0, 10));
  } catch (err) {
    console.error("Error en obtenerEspecialidadesDestacadas:", err);
    res.status(500).json({ message: "Error al obtener especialidades destacadas" });
  }
};
