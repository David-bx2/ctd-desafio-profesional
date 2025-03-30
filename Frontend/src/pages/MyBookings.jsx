import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setError("Usuario no autenticado.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:8080/api/bookings/user/${user.id}`
        );
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al obtener historial de reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <p>Cargando historial de reservas...</p>;
  if (error) return <p>{error}</p>;
  if (bookings.length === 0) return <p>No tienes reservas previas.</p>;

  return (
    <div className="container mt-4">
      <h2 className="home-title">Mis Reservas</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {booking.product?.name || "Producto desconocido"}
            </h5>
            <p className="card-text">
              <strong>Fecha de reserva:</strong> {booking.createdAt}
            </p>
            <p className="card-text">
              <strong>Desde:</strong> {booking.startDate}
            </p>
            <p className="card-text">
              <strong>Hasta:</strong> {booking.endDate}
            </p>
            <p className="card-text">
              <strong>Teléfono:</strong>{" "}
              {booking.phoneNumber || "No registrado"}
            </p>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center my-3">
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          ⬅️ Volver
        </button>
      </div>
    </div>
  );
};

export default MyBookings;
