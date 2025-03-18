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
      
      {/* 📌 Integramos la galería aquí */}
      <ProductGallery images={product.imageUrls} />

      <p className="product-description">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
