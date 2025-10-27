import React, { useMemo } from "react";
import { useMovimientosContext } from "../contexts/MovimientosContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function GraficoEvolucionMensual() {
  const { movimientos } = useMovimientosContext();

  const data = useMemo(() => {
    const datos = meses.map((mes) => ({ mes, ingresos: 0, gastos: 0 }));

    movimientos.forEach((mov) => {
      const monto = Number(mov.monto) || 0;
      const fecha = new Date(mov.fecha);
      if (isNaN(fecha)) return;

      const mesIndex = fecha.getMonth();
      if (mov.tipo === "gasto") datos[mesIndex].gastos += monto;
      if (mov.tipo === "ingreso") datos[mesIndex].ingresos += monto;
    });

    return datos;
  }, [movimientos]);

  const ultimosMovimientos = useMemo(() => {
    return [...movimientos]
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 5);
  }, [movimientos]);

  return (
    <div className="grafico-evolucion p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#003366]">
        Evolución Mensual
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [`$${value}`, name]}
            labelStyle={{ fontWeight: "bold", color: "#003366" }}
          />
          <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontWeight: "bold" }} />
          <Bar dataKey="gastos" fill="#FF8042" name="gastos" />
          <Bar dataKey="ingresos" fill="#00C49F" name="ingresos" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-10">
        <h3 className="text-xl font-bold text-[#003366] mb-4">
          Últimos Movimientos
        </h3>

        <ul className="divide-y divide-gray-200">
          {ultimosMovimientos.length === 0 ? (
            <p className="text-gray-500">No hay movimientos registrados.</p>
          ) : (
            ultimosMovimientos.map((mov) => (
              <li
                key={mov.id}
                className="flex justify-between items-center py-2"
              >
                <span className="font-semibold text-[#003366]">
                  {mov.descripcion}
                </span>
                <span
                  className={`font-bold ${
                    mov.tipo === "gasto" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${Number(mov.monto).toLocaleString("es-AR")}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
