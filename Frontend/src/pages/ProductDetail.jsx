import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductGallery from "../Components/ProductGallery"; // Importa el nuevo componente de galería
import "../styles/ProductDetail.css";


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

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
      <button className="back-button" onClick={() => navigate(-1)}>← Volver</button>
      <h1 className="product-title">{product.name}</h1>
      <p className="product-category">Categoría: {product.category ? product.category.name : "Sin categoría"}</p>
      
      <ProductGallery images={product.imageUrls} />

      <p className="product-description">{product.description}</p>

      {/* Bloque de Características */}
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
    </div>
  );
};

export default ProductDetail;