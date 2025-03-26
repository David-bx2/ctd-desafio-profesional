// ProductDetail.jsx (actualizado con botón compartir ajustado y modal)
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductGallery from "../Components/ProductGallery"; 
import AvailabilityCalendar from "../Components/AvailabilityCalendar";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { Share2 } from "react-feather";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

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

  const productUrl = `${window.location.origin}/product/${product.id}`;
  const image = product.imageUrls?.[0] || "/assets/default.jpg";

  return (
    <div className="product-detail-container">
      <div className="back-button">
        <button className="btn btn-dark" onClick={() => navigate(-1)}>⬅️ Volver</button>
      </div>
      <h1 className="product-title">{product.name}</h1>
      <p className="product-category">Categoría: {product.category ? product.category.name : "Sin categoría"}</p>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-primary" onClick={() => setShowShare(true)}>
          <Share2 size={18} className="me-1" /> Compartir
        </button>
      </div>

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

      {showShare && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Compartir este producto</h5>
                <button type="button" className="btn-close" onClick={() => setShowShare(false)}></button>
              </div>
              <div className="modal-body">
                <img src={image} alt="preview" className="img-fluid mb-3 rounded" />
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Agrega un mensaje personalizado"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                ></textarea>
                <div className="d-flex justify-content-around">
                  <FacebookShareButton url={productUrl} quote={customMessage}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={productUrl} title={customMessage}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={productUrl} title={customMessage}>
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowShare(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
