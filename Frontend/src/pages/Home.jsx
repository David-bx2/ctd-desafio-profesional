import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // ✅ Ahora muestra 10 productos por página

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const shuffled = [...response.data].sort(() => Math.random() - 0.5); // Mezclar
        setProducts(shuffled);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  

  // 🔹 Calcular el índice de productos a mostrar
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  // 🔹 Funciones de paginación
  const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToFirstPage = () => setCurrentPage(1);

  return (
    <div className="home-container">
      <h1 className="home-title">Productos Destacados</h1>

      <div className="product-grid">
        {selectedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

{/* 🔹 Controles de paginación */}
<div className="pagination">
  <button onClick={goToFirstPage} disabled={currentPage === 1}>Inicio</button>
  <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>

  {/* Botones de páginas */}
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => setCurrentPage(i + 1)}
      className={currentPage === i + 1 ? "active" : ""}
    >
      {i + 1}
    </button>
  ))}

  <button onClick={nextPage} disabled={currentPage === totalPages}>Siguiente</button>
</div>
    </div>
  );
};

export default Home;
