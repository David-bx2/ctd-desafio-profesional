// ReservationDetail.jsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductPolicies from "./ProductPolicies";

const ReservationDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Tomamos productId, start y end de la URL
  const productId = searchParams.get("productId");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  // Obtenemos el user del localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Estado para guardar el producto que mostraremos
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Cargar los detalles del producto
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${productId}`);
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
          start,
          end,
        },
      });
      alert("Reserva confirmada con éxito.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Error al confirmar la reserva.");
    }
  };

  // Chequear si no hay user o si no hay productId
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
    <div className="container mt-5">
      <h2>Detalles de la Reserva</h2>
      <div className="mt-3 p-3 border rounded">
        <h4>Producto: {product.name}</h4>
        <img
          src={product.imageUrls?.[0] || "/assets/default.jpg"}
          alt={product.name}
          style={{ maxWidth: "300px" }}
        />
        <p>{product.description}</p>
      </div>

      <div className="mt-3 p-3 border rounded">
        <h5>Usuario:</h5>
        <p>Nombre: {user.name}</p> 
        <p>Email: {user.email}</p>
      </div>

      <div className="mt-3 p-3 border rounded">
        <h5>Fechas seleccionadas:</h5>
        <p>
          <strong>Inicio:</strong> {start}
        </p>
        <p>
          <strong>Fin:</strong> {end}
        </p>
      </div>

      <ProductPolicies />


      <div className="mt-4 d-flex justify-content-center gap-3">
  <button className="btn btn-primary" onClick={handleConfirm}>
    Confirmar Reserva
  </button>
  <button className="btn btn-secondary" onClick={() => navigate(-1)}>
    Volver
  </button>
</div>

    </div>
  );
};

export default ReservationDetail;
