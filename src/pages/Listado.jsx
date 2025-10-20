import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovimientosContext } from "../contexts/MovimientosContext";

function Listado() {
  const navigate = useNavigate();
  const { movimientos, deleteMovimiento } = useMovimientosContext();

  const [searchText, setSearchText] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");

  const categorias = useMemo(() => {
    const set = new Set(movimientos.map(m => m.categoria));
    return Array.from(set);
  }, [movimientos]);

  const movimientosFiltrados = useMemo(() => {
    return movimientos
      .filter(m =>
        searchText.trim() === "" ||
        m.descripcion.toLowerCase().includes(searchText.toLowerCase())
      )
      .filter(m => (filterTipo ? m.tipo === filterTipo : true))
      .filter(m => (filterCategoria ? m.categoria === filterCategoria : true));
  }, [movimientos, searchText, filterTipo, filterCategoria]);

  return (
    <div className="listado-movimientos">
      <h2>Mis Movimientos</h2>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por descripción..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)}>
          <option value="">Todos los tipos</option>
          <option value="gasto">Gasto</option>
          <option value="ingreso">Ingreso</option>
        </select>

        <select value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {movimientosFiltrados.length === 0 ? (
        <p>No hay movimientos registrados. ¡Comenzá agregando uno!</p>
      ) : (
        <div className="cards-container">
          {movimientosFiltrados.map((mov) => (
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
                <button onClick={() => {
                  if (window.confirm("¿Seguro que querés eliminar este movimiento?")) {
                    deleteMovimiento(mov.id);
                  }
                }}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Listado;