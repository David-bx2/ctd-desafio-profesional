import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const mainImage =
    Array.isArray(product.imageUrls) && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : "/assets/default.jpg";

  const userRef = useRef(JSON.parse(localStorage.getItem("user")));
  const user = userRef.current;

  const [isFavorite, setIsFavorite] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [ratingInfo, setRatingInfo] = useState({ average: null, count: 0 });

  useEffect(() => {
    if (!product.id || !user) return;

    const checkFavorite = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/favorites/check",
          {
            params: { userId: user.id, productId: product.id },
          }
        );
        setIsFavorite(res.data);
      } catch (err) {
        console.error("Error al verificar favorito", err);
      }
    };

    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/reviews/product/${product.id}/average`
        );
        setRatingInfo(res.data);
      } catch (err) {
        console.error("Error obteniendo promedio de reviews:", err);
      }
    };

    checkFavorite();
    fetchRating();
  }, [product.id]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (isFavorite) {
        await axios.delete("http://localhost:8080/api/favorites", {
          params: { userId: user.id, productId: product.id },
        });
        setIsFavorite(false);
      } else {
        await axios.post("http://localhost:8080/api/favorites", null, {
          params: { userId: user.id, productId: product.id },
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
          {isFavorite ? (
            <FaHeart color="red" size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}
        </div>
      )}

      <Link to={`/product/${product.id}`}>
        <img src={mainImage} alt={product.name} className="product-image" />
        {ratingInfo.average !== null && (
          <div className="rating-summary mb-2">
            ⭐ {ratingInfo.average.toFixed(1)} ({ratingInfo.count})
          </div>
        )}
        <h3>{product.name}</h3>
      </Link>
    </div>
  );
};

export default ProductCard;
