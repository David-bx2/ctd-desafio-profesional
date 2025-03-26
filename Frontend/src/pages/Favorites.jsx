import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Favorites = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const res = await axios.get("http://localhost:8080/api/favorites", {
          params: { userId: user.id },
        });

        // Extraer sólo los productos
        const products = res.data.map((fav) => fav.product);
        setFavorites(products);
      } catch (err) {
        console.error("Error al obtener favoritos", err);
        setError("No se pudieron cargar los productos favoritos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <div className="home-container">
      <h1 className="home-title">Mis Productos Favoritos</h1>

      {loading && <p className="text-center">Cargando favoritos...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && favorites.length === 0 && (
        <p className="text-center">Aún no has marcado ningún producto como favorito.</p>
      )}

      <div className="product-grid">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="d-flex justify-content-center my-3">
  <button className="btn btn-dark" onClick={() => navigate(-1)}>⬅️ Volver</button>
</div>

    </div>
  );
};

export default Favorites;
