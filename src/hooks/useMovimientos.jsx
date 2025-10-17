import { useLocalStorage } from './useLocalStorage'

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
  const [movimientos, setMovimientos] = useLocalStorage(STORAGE_KEY, MOCK_MOVIMIENTOS)

  const addMovimiento = (mov) => setMovimientos([...movimientos, mov])
  const editMovimiento = (id, updated) =>
    setMovimientos(movimientos.map(m => m.id === id ? { ...m, ...updated } : m))
  const deleteMovimiento = (id) =>
    setMovimientos(movimientos.filter(m => m.id !== id))
  const resetMovimientos = () => setMovimientos([])

  
  const filterByText = (text) =>
    movimientos.filter(m => m.descripcion.toLowerCase().includes(text.toLowerCase()))

  const filterByCategoria = (categoria) =>
    movimientos.filter(m => m.categoria === categoria)

  const filterByTipo = (tipo) =>
    movimientos.filter(m => m.tipo === tipo)

  const sortByFecha = () =>
    [...movimientos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  const sortByMonto = () =>
    [...movimientos].sort((a, b) => b.monto - a.monto)

  return {
    movimientos,
    addMovimiento,
    editMovimiento,
    deleteMovimiento,
    resetMovimientos,
    setMovimientos,
    filterByText,
    filterByCategoria,
    filterByTipo,
    sortByFecha,
    sortByMonto,
  }
}
