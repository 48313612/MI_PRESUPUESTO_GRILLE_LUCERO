import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink>
      <NavLink to="/nuevo" className={({ isActive }) => isActive ? 'active' : ''}>Nuevo</NavLink>
      <NavLink to="/resumen" className={({ isActive }) => isActive ? 'active' : ''}>Resumen</NavLink>
      <NavLink to="/ajustes" className={({ isActive }) => isActive ? 'active' : ''}>Ajustes</NavLink>
    </nav>
  );
}

export default Navbar;