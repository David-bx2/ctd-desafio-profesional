import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Components/assets/logo.png";

const Header = ({ user, setUser }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Cierra el menú si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    navigate("/"); // Opcional: redirige al home
  };

  const handleNavigate = (path) => {
    setShowMenu(false);
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" height="40" className="me-2" />
          <span>Los Mejores Autos</span>
        </Link>

        <div className="position-relative" ref={menuRef}>
          {user ? (
            <div
              className="d-flex align-items-center text-white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowMenu((prev) => !prev)}
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

          {showMenu && (
            <div
              className="dropdown-menu show mt-2"
              style={{ right: 0, left: "auto", position: "absolute" }}
            >
              {user?.isAdmin && (
                <button
                  className="dropdown-item"
                  onClick={() => handleNavigate("/administracion")}
                >
                  Panel Admin
                </button>
              )}
              <button className="dropdown-item" onClick={handleLogout}>
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
