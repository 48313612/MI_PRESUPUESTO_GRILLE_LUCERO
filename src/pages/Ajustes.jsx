import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Ajustes() {
  const { dark, setDark } = useContext(ThemeContext);

  const handleLimpiarDatos = () => {
    //hacer funcion de limpiar datos
  };

  return (
    <div className="ajustes p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Ajustes</h2>

      <div className="ajustes-section flex flex-col gap-6">
        <div>
          <h3 className="font-semibold mb-2">Apariencia</h3>
          <button
            className="btn-primary bg-gray-700 text-white rounded p-2 hover:bg-gray-800 transition"
            onClick={() => setDark(!dark)}
          >
            {dark ? "Cambiar a Tema Claro" : "Cambiar a Tema Oscuro"}
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Datos</h3>
          <button
            className="btn-danger bg-red-600 text-white rounded p-2 hover:bg-red-700 transition"
            onClick={handleLimpiarDatos}
          >
            Limpiar todos los datos
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ajustes;