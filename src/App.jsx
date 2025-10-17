import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Listado from "./pages/Listado"; 
import Nuevo from "./pages/Nuevo";
import Editar from "./pages/Editar";
import Resumen from "./pages/Resumen";
import Ajustes from "./pages/Ajustes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Listado />} />
        <Route path="nuevo" element={<Nuevo />} />
        <Route path="resumen" element={<Resumen />} />
        <Route path="ajustes" element={<Ajustes />} />
        <Route path="editar/:id" element={<Editar />} />
      </Route>
    </Routes>
  );
}

export default App;