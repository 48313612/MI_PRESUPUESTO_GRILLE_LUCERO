import React, { useMemo } from "react";
import { useMovimientosContext } from "../contexts/MovimientosContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const meses = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

export default function GraficoEvolucionMensual() {
  const { movimientos } = useMovimientosContext();

  const data = useMemo(() => {
    const datos = meses.map((mes) => ({ mes, ingresos: 0, gastos: 0 }));

    movimientos.forEach((mov) => {
      const fecha = new Date(mov.fecha);
      const mesIndex = fecha.getMonth();
      if (mov.tipo === "gasto") datos[mesIndex].gastos += mov.monto;
      if (mov.tipo === "ingreso") datos[mesIndex].ingresos += mov.monto;
    });

    return datos;
  }, [movimientos]);

  return (
    <div className="grafico-circular p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Evolucion Mensual
      </h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gastos" fill="#FF8042" />
        <Bar dataKey="ingresos" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}