import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function GraficoGastoPorCategoria({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-center">No hay datos para mostrar.</p>;
  }

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0", "#FF9800"];

  return (
    <div className="grafico-circular p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Gastos por categoría
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="monto"
            nameKey="categoria"
            label={({ categoria, percent }) =>
              `${categoria}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(valor, name, entry) => [`$${valor}`, entry.payload.categoria]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoGastoPorCategoria;
