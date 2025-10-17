import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Ajustes() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <div className="ajustes">
      <h2>Ajustes</h2>

      <div className="ajustes-section">
        <h3>Apariencia</h3>
        <div className="setting-item">
          <button
            className="btn-primary"
            onClick={() => setDark(!dark)}
          >
            {dark ? "Cambiar a Tema Claro" : "Cambiar a Tema Oscuro"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ajustes;