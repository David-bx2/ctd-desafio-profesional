import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="admin-restricted">
        <p>🚫 El Panel de Administración no está disponible en dispositivos móviles.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 admin-panel">
      <h2>Panel de Administración</h2>

      <ul className="admin-menu">
        <li>
          <Link to="/add-product" className="btn btn-success">📦 Agregar Producto</Link>
        </li>
        <li>
          <Link to="/admin/products" className="btn btn-primary">📋 Lista de Productos</Link>
        </li>

        <li>
          <Link to="/admin/users" className="btn btn-secondary">👥 Gestionar Usuarios</Link>
        </li>
        <li>
          <Link to="/admin/reservations" className="btn btn-info">📅 Gestionar Reservas</Link>
        </li>
        <li>
          <Link to="/" className="btn btn-dark">🏠 Volver al Inicio</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPanel;
