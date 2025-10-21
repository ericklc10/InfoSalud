import { useState } from "react";
import "../estilos/BotonSeguir.css"; 


function BotonSeguir({ hospitalId }) {
  const [siguiendo, setSiguiendo] = useState(false);

  const handleClick = () => {
    setSiguiendo(!siguiendo);
    // Podés agregar lógica para guardar en Supabase si querés
    // Ej: fetch POST a /api/seguir con hospitalId y userId
  };

  return (
    <button className={`boton-seguir ${siguiendo ? "activo" : ""}`} onClick={handleClick}>
      {siguiendo ? "Siguiendo" : "Seguir"}
    </button>
  );
}

export default BotonSeguir;
