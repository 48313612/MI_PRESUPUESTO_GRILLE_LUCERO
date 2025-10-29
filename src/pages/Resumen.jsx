import React, { useMemo } from "react";
import { useMovimientosContext } from "../contexts/MovimientosContext";
import GraficoGastoPorCategoria from "../components/GraficoGastoPorCategoria";
import GraficoEvolucionMensual from "../components/GraficoEvolucionMensual";

function Resumen() {
  const { movimientos } = useMovimientosContext();

  const stats = useMemo(() => {
    const ingresos = movimientos
      .filter((m) => m.tipo === "ingreso")
      .reduce((sum, m) => sum + m.monto, 0);

    const gastos = movimientos
      .filter((m) => m.tipo === "gasto")
      .reduce((sum, m) => sum + m.monto, 0);

    const balance = ingresos - gastos;
    return { ingresos, gastos, balance };
  }, [movimientos]);

  const categoriasMasGastadas = useMemo(() => {
    const gastosPorCategoria = movimientos
      .filter((m) => m.tipo === "gasto")
      .reduce((acc, m) => {
        acc[m.categoria] = (acc[m.categoria] || 0) + m.monto;
        return acc;
      }, {});
    return Object.entries(gastosPorCategoria)
      .map(([categoria, monto]) => ({ categoria, monto }))
      .sort((a, b) => b.monto - a.monto);
  }, [movimientos]);


  return (
    <div className="resumen">
      <h2>Resumen Financiero</h2>

      <div className="stats-container">
        <div className="stat-card ingreso">
          <h3>Total Ingresos</h3>
          <p className="amount">${stats.ingresos.toFixed(2)}</p>
        </div>

        <div className="stat-card gasto">
          <h3>Total Gastos</h3>
          <p className="amount">${stats.gastos.toFixed(2)}</p>
        </div>

        <div
          className={`stat-card balance ${
            stats.balance >= 0 ? "positivo" : "negativo"
          }`}
        >
          <h3>Balance</h3>
          <p className="amount">${stats.balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="categorias-section">
        <h3>Top Categorías de Gasto</h3>
        {categoriasMasGastadas.length === 0 ? (
          <p>No hay gastos registrados.</p>
        ) : (
          <>
            <ul className="categorias-list">
              {categoriasMasGastadas.map(({ categoria, monto }) => (
                <li key={categoria}>
                  <span className="categoria-name">{categoria}</span>
                  <span className="categoria-monto">${monto.toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <GraficoGastoPorCategoria data={categoriasMasGastadas} />
          </>
        )}
      </div>

      <div className="evolucion-section">
        {movimientos.length === 0 ? (
          <p>No hay movimientos para mostrar.</p>
        ) : (
            <GraficoEvolucionMensual />
        )}
      </div>

      <div className="ultimos-movimientos-section">
        <h3>Últimos Movimientos</h3>
        {movimientos.length === 0 ? (
          <p>No hay movimientos registrados.</p>
        ) : (
          <ul className="movimientos-list">
            {movimientos
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .slice(0, 5)
              .map((mov) => (
                <li key={mov.id} className={mov.tipo}>
                  <span className="descripcion">{mov.descripcion}</span>
                  <span className="monto">${Number(mov.monto).toFixed(2)}</span>
                </li>
              ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default Resumen;