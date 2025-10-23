import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from "recharts";

function GraficoGastoPorCategoria() {
  //reemplazar data por movimientos reales
  const data = [
    { nombre: "Comida", valor: 4500 },
    { nombre: "Transporte", valor: 2000 },
    { nombre: "Ocio", valor: 1500 },
    { nombre: "Salud", valor: 800 },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

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
            dataKey="valor"
            label={({ nombre, percent }) =>
              `${nombre}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(valor) => `$${valor}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoGastoPorCategoria;