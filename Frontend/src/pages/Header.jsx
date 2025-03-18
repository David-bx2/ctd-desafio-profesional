import React from "react";
import { Link } from "react-router-dom";
import logo from "../Components/assets/logo.png"; 

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" height="40" className="me-2" />
          <span>Los Mejores Autos </span>
        </Link>

        
        <div>
          <Link to="/login" className="btn btn-outline-light me-2">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn btn-primary">
            Crear Cuenta
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
