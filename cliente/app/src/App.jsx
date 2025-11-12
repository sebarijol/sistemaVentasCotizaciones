import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Productos from "./pages/Productos"; 
import Reportes from "./pages/Reportes";
import Cotizaciones from "./pages/Cotizaciones";
import Campañas from "./pages/Campañas";
import Notificaciones from "./pages/Notificaciones";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/campañas" element={<Campañas />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
      </Routes>
    </Router>
  );
}

export default App;
