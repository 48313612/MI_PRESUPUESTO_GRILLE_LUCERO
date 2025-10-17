import { createContext, useContext } from 'react'
import { useMovimientos } from '../hooks/useMovimientos'

export const MovimientosContext = createContext()

export function MovimientosProvider({ children }) {
  const movimientosHook = useMovimientos()

  return (
    <MovimientosContext.Provider value={movimientosHook}>
      {children}
    </MovimientosContext.Provider>
  )
}

export function useMovimientosContext() {
  return useContext(MovimientosContext)
}