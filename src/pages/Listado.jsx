import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovimientosContext } from "../contexts/MovimientosContext";
import Editar from "./Editar";

function Listado() {
  const navigate = useNavigate();
  const { movimientos, deleteMovimiento } = useMovimientosContext();

  return (
    <div className="listado-movimientos">
      <h2>Mis Movimientos</h2>

      {movimientos.length === 0 ? (
        <p>No hay movimientos registrados. ¡Comenzá agregando uno!</p>
      ) : (
        <div className="cards-container">
          {movimientos.map((mov) => (
            <div key={mov.id} className={`card ${mov.tipo}`}>
              <h3>{mov.descripcion}</h3>
              <p>
                <strong>Categoría:</strong> {mov.categoria}
              </p>
              <p>
                <strong>Tipo:</strong> {mov.tipo}
              </p>
              <p>
                <strong>Monto:</strong> ${mov.monto}
              </p>
              <p>
                <strong>Fecha:</strong> {mov.fecha}
              </p>
              <div className="card-buttons">
                <button className="btn-edit" onClick={() => navigate(`/editar/${mov.id}`)}>Editar</button>
                <button onClick={() => deleteMovimiento(mov.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Listado;