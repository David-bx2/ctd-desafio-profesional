import React from "react";
import "../styles/SuccessPopup.css";
import successImage from "./assets/success-popup.png";

const SuccessPopup = ({ onClose }) => {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup">
        <img src={successImage} alt="Reserva exitosa" />
        <h4>¡Reserva realizada con éxito!</h4>
        <p>
          Se ha enviado un correo de confirmación a tu dirección registrada.
        </p>
        <button className="btn btn-success mt-2" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
