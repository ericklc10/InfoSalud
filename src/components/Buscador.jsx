import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../estilos/Buscador.css";

function Buscador() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const initial = params.get("query") || "";

  const [query, setQuery] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/buscar?query=${encodeURIComponent(query)}`);
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}

export default Buscador;
