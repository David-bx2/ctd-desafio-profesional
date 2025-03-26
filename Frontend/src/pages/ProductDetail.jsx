import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductGallery from "../Components/ProductGallery"; 
import AvailabilityCalendar from "../Components/AvailabilityCalendar";
import "../styles/ProductDetail.css";


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="product-detail-container">
      <div className="back-button">
      <button className="btn btn-dark" onClick={() => navigate(-1)}>⬅️ Volver</button>
      </div>
      <h1 className="product-title">{product.name}</h1>
      <p className="product-category">Categoría: {product.category ? product.category.name : "Sin categoría"}</p>
      
      <ProductGallery images={product.imageUrls} />

      <p className="product-description">{product.description}</p>


      <div className="product-features mt-4">
        <h3>Características</h3>
        <div className="features-grid">
          {product.features?.map((feature) => (
            <div key={feature.id} className="feature-card">
              <img src={feature.icon} alt={feature.name} className="feature-icon" />
              <div>
                <strong>{feature.name}</strong>
                <p>{feature.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="product-availability mt-4">
  <h3>Disponibilidad</h3>
  <div className="availability-toggle text-center mt-3">
    <button className="btn btn-primary" onClick={() => setShowCalendar(!showCalendar)}>
      {showCalendar ? "Ocultar disponibilidad" : "Consultar disponibilidad"}
    </button>
  </div>

  {showCalendar && (
    <div className="availability-calendar mt-3">
      <AvailabilityCalendar productId={product.id} />
    </div>
  )}
</div>
<div className="product-policies mt-5">
  <h3 className="section-title">Políticas del Vehículo</h3>
  <div className="row">
    <div className="col-md-4">
      <h5>Uso Responsable</h5>
      <p>El vehículo debe ser conducido por el titular de la reserva y con licencia válida. No se permite el uso en competencias ni actividades ilegales.</p>
    </div>
    <div className="col-md-4">
      <h5>Combustible y Mantenimiento</h5>
      <p>El vehículo debe devolverse con el mismo nivel de combustible. No es necesario realizar mantenimiento, pero se espera cuidado razonable.</p>
    </div>
    <div className="col-md-4">
      <h5>Política de Cancelación</h5>
      <p>Las cancelaciones se aceptan hasta 24 horas antes del inicio de la reserva. Cancelaciones tardías pueden estar sujetas a cargos.</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default ProductDetail;