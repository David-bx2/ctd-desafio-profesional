import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8080/api/users/register", user);
      alert("Registro exitoso. Revisa tu correo para más información.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || "Error al registrarse");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/resend-confirmation", {
        email: resendEmail,
      });
      setResendMessage("Correo de confirmación reenviado.");
    } catch {
      setResendMessage("No se pudo reenviar el correo.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      {error && (
        <p className="text-danger">
          {typeof error === "string"
            ? error
            : error.message || "Error al registrarse"}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido:</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>

      {/* Sección para reenviar confirmación */}
      <div className="mt-5">
        <h4>¿No recibiste el correo de confirmación?</h4>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="form-control mb-2"
          value={resendEmail}
          onChange={(e) => setResendEmail(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleResend}>
          Reenviar Confirmación
        </button>
        {resendMessage && <p className="mt-2">{resendMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
