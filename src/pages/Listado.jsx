import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovimientosContext } from "../contexts/MovimientosContext";

function Listado() {
  const navigate = useNavigate();
  const { movimientos, deleteMovimiento } = useMovimientosContext();

  const [searchText, setSearchText] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [montoMin, setMontoMin] = useState("");
  const [montoMax, setMontoMax] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDir, setSortDir] = useState("desc");

  const categorias = useMemo(() => {
    const set = new Set(movimientos.map(m => m.categoria));
    return Array.from(set);
  }, [movimientos]);

  const movimientosFiltrados = useMemo(() => {
    let lista = movimientos
      .filter(m =>
        searchText.trim() === "" ||
        m.descripcion.toLowerCase().includes(searchText.toLowerCase())
      )
      .filter(m => (filterTipo ? m.tipo === filterTipo : true))
      .filter(m => (filterCategoria ? m.categoria === filterCategoria : true))
      .filter(m => {
        if (!fechaDesde && !fechaHasta) return true;
        const f = new Date(m.fecha).getTime();
        const desdeOk = fechaDesde ? f >= new Date(fechaDesde).getTime() : true;
        const hastaOk = fechaHasta ? f <= new Date(fechaHasta).getTime() : true;
        return desdeOk && hastaOk;
      })
      .filter(m => {
        const monto = Number(m.monto) || 0;
        const minOk = montoMin !== "" ? monto >= Number(montoMin) : true;
        const maxOk = montoMax !== "" ? monto <= Number(montoMax) : true;
        return minOk && maxOk;
      });

    if (sortField) {
      const factor = sortDir === "asc" ? 1 : -1;
      lista = [...lista].sort((a, b) => {
        if (sortField === "fecha") {
          const da = new Date(a.fecha).getTime();
          const db = new Date(b.fecha).getTime();
          return (da - db) * factor;
        }
        if (sortField === "monto") {
          return (Number(a.monto) - Number(b.monto)) * factor;
        }
        return 0;
      });
    }

    return lista;
  }, [movimientos, searchText, filterTipo, filterCategoria, fechaDesde, fechaHasta, montoMin, montoMax, sortField, sortDir]);

  const limpiarFiltros = () => {
    setSearchText("");
    setFilterTipo("");
    setFilterCategoria("");
    setFechaDesde("");
    setFechaHasta("");
    setMontoMin("");
    setMontoMax("");
    setSortField("");
    setSortDir("desc");
  };

  return (
    <div className="listado-movimientos">
      <h2>Mis Movimientos</h2>

      <div className="filtros-container">
        <div className="filtros-header">
          <h3>Filtros y Búsqueda</h3>
        </div>

        <div className="filtros-grid">
          <div className="filtro-group">
            <label htmlFor="buscar">Buscar por descripción</label>
            <input
              id="buscar"
              type="text"
              placeholder="Ej: supermercado"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="filtro-group">
            <label htmlFor="tipo">Tipo</label>
            <select id="tipo" value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)}>
              <option value="">Todos</option>
              <option value="gasto">Gasto</option>
              <option value="ingreso">Ingreso</option>
            </select>
          </div>

          <div className="filtro-group">
            <label htmlFor="categoria">Categoría</label>
            <select id="categoria" value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)}>
              <option value="">Todas</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filtro-group">
            <label>Fecha (desde/hasta)</label>
            <div className="filtro-rango">
              <input
                aria-label="Fecha desde"
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
              />
              <input
                aria-label="Fecha hasta"
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
              />
            </div>
          </div>

          <div className="filtro-group">
            <label>Monto (mín/máx)</label>
            <div className="filtro-rango">
              <input
                aria-label="Monto mínimo"
                type="number"
                inputMode="decimal"
                step="0.01"
                value={montoMin}
                onChange={(e) => setMontoMin(e.target.value)}
              />
              <input
                aria-label="Monto máximo"
                type="number"
                inputMode="decimal"
                step="0.01"
                value={montoMax}
                onChange={(e) => setMontoMax(e.target.value)}
              />
            </div>
          </div>

          <div className="filtro-group">
            <label htmlFor="ordenar">Ordenar por</label>
            <div className="filtro-orden">
              <select id="ordenar" value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="">Sin orden</option>
                <option value="fecha">Fecha</option>
                <option value="monto">Monto</option>
              </select>
              <select aria-label="Dirección de orden" value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </div>
        </div>

        <div className="filtros-actions">
          <button type="button" onClick={limpiarFiltros} className="btn-limpiar">Limpiar filtros</button>
        </div>
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