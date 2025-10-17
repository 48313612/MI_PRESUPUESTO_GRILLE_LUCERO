import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovimientosContext } from "../contexts/MovimientosContext";

function Nuevo() {
  const navigate = useNavigate();
  const { addMovimiento } = useMovimientosContext();
  
  const [formData, setFormData] = useState({
    descripcion: "",
    categoria: "alimentacion",
    tipo: "gasto",
    monto: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevoMovimiento = {
      ...formData,
      id: Date.now(),
      monto: parseFloat(formData.monto),
    };
    
    addMovimiento(nuevoMovimiento);
    navigate("/");
  };

  return (
    <div className="nuevo-movimiento">
      <h2>Nuevo Movimiento</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="gasto">Gasto</option>
            <option value="ingreso">Ingreso</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="alimentacion">Alimentación</option>
            <option value="transporte">Transporte</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="salud">Salud</option>
            <option value="educacion">Educación</option>
            <option value="servicios">Servicios</option>
            <option value="ingresos">Ingresos</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="monto">Monto:</label>
          <input
            type="number"
            id="monto"
            name="monto"
            value={formData.monto}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Guardar</button>
          <button type="button" className="btn-secondary" onClick={() => navigate("/")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Nuevo;