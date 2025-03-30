import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductPolicies from "./ProductPolicies";
import SuccessPopup from "./SuccessPopup";
import "../styles/ReservationDetail.css";

const ReservationDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const productId = searchParams.get("productId");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const phone = searchParams.get("phone") || "";
  const comments = searchParams.get("comments") || "";

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const res = await axios.get(
          `http://localhost:8080/api/products/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        setErrorMsg("Error al obtener producto");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleConfirm = async () => {
    try {
      await axios.post("http://localhost:8080/api/bookings", null, {
        params: {
          productId,
          userId: user.id,
          start,
          end,
          phoneNumber: phone,
        },
      });

      setShowSuccess(true);
    } catch (err) {
      alert(err.response?.data || "Error al confirmar la reserva.");
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <p>No se encontró un usuario logueado. Por favor inicia sesión.</p>
      </div>
    );
  }

  if (loading) return <p>Cargando detalles...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (!product) return <p>No se encontró el producto solicitado.</p>;

  return (
    <div className="reserve-form-container">
      <div className="reserve-form-inner">
        <h2 className="text-center">Detalles de la Reserva</h2>
        <div className="reservation-box">
          <h4>Producto: {product.name}</h4>
          <img
            src={product.imageUrls?.[0] || "/assets/default.jpg"}
            alt={product.name}
            style={{ maxWidth: "300px" }}
          />
          <p>{product.description}</p>
        </div>

        <div className="reservation-box">
          <h5>Usuario:</h5>
          <p>
            <strong>Nombre:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {phone}
          </p>
          <p>
            <strong>Comentarios:</strong>{" "}
            {comments || "Sin comentarios adicionales"}
          </p>
        </div>

        <div className="reservation-box">
          <h5>Fechas seleccionadas:</h5>
          <p>
            <strong>Inicio:</strong> {start}
          </p>
          <p>
            <strong>Fin:</strong> {end}
          </p>
        </div>

        <ProductPolicies />

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleConfirm}>
            Confirmar Reserva
          </button>
          <button className="btn btn-dark" onClick={() => navigate(-1)}>
            ⬅️ Volver
          </button>
        </div>
        {showSuccess && <SuccessPopup onClose={() => navigate("/")} />}
      </div>
    </div>
  );
};

export default ReservationDetail;
