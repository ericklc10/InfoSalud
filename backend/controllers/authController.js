import bcrypt from 'bcrypt';
import supabase from '../config/supabaseClient.js';

// Registro de usuario
export const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el email ya existe
    const { data: existingUser, error: findError } = await supabase
      .from('usuarios')
      .select('email')
      .eq('email', email)
      .single();

    if (findError && findError.code !== 'PGRST116') throw findError;
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const { data: insertedUser, error: insertError } = await supabase
      .from('usuarios')
      .insert([{
        email,
        password: hashedPassword,
        nombre,
        created_at: new Date().toISOString()
      }])
      .select()
      .single(); // 👈 para obtener el usuario insertado

    if (insertError) throw insertError;

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      token: 'fake-jwt-token',
      nombre: insertedUser.nombre
    });
  } catch (err) {
    console.error('Error en registro:', err);
    return res.status(500).json({ message: err.message || 'Error al registrar usuario' });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error: fetchError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError) throw fetchError;
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    return res.status(200).json({
      message: 'Login exitoso',
      token: 'fake-jwt-token',
      nombre: user.nombre
    });
  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ message: err.message || 'Error al iniciar sesión' });
  }
};
