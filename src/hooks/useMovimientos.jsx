import { useState, useEffect } from 'react'

const STORAGE_KEY = 'movimientos'
const MOCK_MOVIMIENTOS = [
  {
    id: 1,
    descripcion: "Compra supermercado",
    categoria: "alimentacion",
    tipo: "gasto",
    monto: 1500,
    fecha: "2025-10-10",
  },
  {
    id: 2,
    descripcion: "Sueldo",
    categoria: "ingresos",
    tipo: "ingreso",
    monto: 50000,
    fecha: "2025-10-05",
  },
  {
    id: 3,
    descripcion: "Transporte",
    categoria: "transporte",
    tipo: "gasto",
    monto: 2000,
    fecha: "2025-10-07",
  },
]

export function useMovimientos() {
  const [movimientos, setMovimientos] = useState(() => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) return JSON.parse(data)
    // Si no hay datos, inicializa con mockeados
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_MOVIMIENTOS))
    return MOCK_MOVIMIENTOS
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movimientos))
  }, [movimientos])

  const addMovimiento = (mov) => setMovimientos([...movimientos, mov])
  const editMovimiento = (id, updated) =>
    setMovimientos(movimientos.map(m => m.id === id ? { ...m, ...updated } : m))
  const deleteMovimiento = (id) =>
    setMovimientos(movimientos.filter(m => m.id !== id))
  const resetMovimientos = () => setMovimientos([])

  return {
    movimientos,
    addMovimiento,
    editMovimiento,
    deleteMovimiento,
    resetMovimientos,
    setMovimientos,
  }
}