import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const mainImage = Array.isArray(product.imageUrls) && product.imageUrls.length > 0
    ? product.imageUrls[0]
    : "/assets/default.jpg";

  const user = JSON.parse(localStorage.getItem("user"));
  const [isFavorite, setIsFavorite] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:8080/api/favorites/check`, {
          params: {
            userId: user.id,
            productId: product.id
          }
        });
        setIsFavorite(res.data);
      } catch (err) {
        console.error("Error al verificar favorito", err);
      }
    };

    checkFavorite();
  }, [product.id, user]);

  const toggleFavorite = async (e) => {
    e.preventDefault(); 
    if (!user) return;

    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:8080/api/favorites`, {
          params: { userId: user.id, productId: product.id }
        });
        setIsFavorite(false);
      } else {
        await axios.post(`http://localhost:8080/api/favorites`, null, {
          params: { userId: user.id, productId: product.id }
        });
        setIsFavorite(true);
      }

      setAnimate(true);
      setTimeout(() => setAnimate(false), 400);
    } catch (err) {
      console.error("Error al cambiar favorito", err);
    }
  };

  return (
    <div className="product-card">
      {user && (
        <div
          className={`favorite-icon ${animate ? "animate" : ""}`}
          onClick={toggleFavorite}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? <FaStar color="gold" size={20} /> : <FaRegStar size={20} />}
        </div>
      )}

      <Link to={`/product/${product.id}`}>
        <img src={mainImage} alt={product.name} className="product-image" />
        <h3>{product.name}</h3>
      </Link>
    </div>
  );
};

export default ProductCard;
