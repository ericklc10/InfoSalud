import fetch from 'node-fetch';

const testLogin = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@infosalud.com',
        password: '123456'
      })
    });

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Login exitoso:', data);
    } else {
      console.log('❌ Error en login:', data.message);
    }
  } catch (err) {
    console.error('🚫 Error al conectar con la API:', err.message);
  }
};

testLogin();
