import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Components/assets/logo.png";

const Header = ({ user, setUser }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowMenu(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" height="40" className="me-2" />
          <span>Los Mejores Autos</span>
        </Link>

        <div className="position-relative">
          {user ? (
            <div
              className="d-flex align-items-center text-white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowMenu(!showMenu)}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#0d6efd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                  fontWeight: "bold",
                }}
              >
                {getInitials(user.name)}
              </div>
              <span>{user.name}</span>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-primary">
                Crear Cuenta
              </Link>
            </>
          )}

          {/* 🔽 Menú desplegable */}
          {showMenu && (
            <div
              className="dropdown-menu show mt-2"
              style={{ right: 0, left: "auto", position: "absolute" }}
            >
              {user?.isAdmin && (
              <Link to="/administracion" className="dropdown-item" style={{ textDecoration: "none", color: "black" }}>
                Panel Admin
              </Link>
              )}
              <button className="dropdown-item"  onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
