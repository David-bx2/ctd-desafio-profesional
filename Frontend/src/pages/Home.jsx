import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import SearchBlock from "../Components/SearchBlock";
import "../styles/Home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        const shuffled = [...res.data].sort(() => Math.random() - 0.5);
        setProducts(shuffled);
        setFilteredProducts(shuffled);
        setSearchPerformed(false);
        setSearchResults(null);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        if (selectedCategories.length === 0) {
          setFilteredProducts(products);
        } else {
          const query = selectedCategories.join(",");
          const res = await axios.get(
            `http://localhost:8080/api/products/filter?categories=${query}`
          );
          setFilteredProducts(res.data);
        }
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFiltered();
  }, [selectedCategories, products]);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => setSelectedCategories([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setSearchPerformed(true);
    setCurrentPage(1);
  };

  let renderMode = "featured";
  if (searchPerformed) {
    if (searchResults && searchResults.length > 0) {
      renderMode = "search";
    } else {
      renderMode = "no-results";
    }
  }

  const totalPages = Math.ceil(
    (renderMode === "search"
      ? searchResults?.length || 0
      : filteredProducts.length) / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = (
    renderMode === "search" ? searchResults : filteredProducts
  ).slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToFirstPage = () => setCurrentPage(1);

  return (
    <div className="home-container">
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? "Ocultar Buscador" : "Mostrar Buscador"}
        </button>
      </div>
      {showSearch && <SearchBlock onSearchResults={handleSearchResults} />}

      {!searchPerformed && <h1 className="home-title">Productos Destacados</h1>}

      <button
        className="filter-toggle-btn"
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? "Ocultar Filtros" : "Mostrar Filtros"}
      </button>

      <div className="home-content">
        <div className={`category-filter ${showFilter ? "show" : ""}`}>
          <h4>Filtrar por Categoría</h4>
          {categories.map((cat) => (
            <div key={cat.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`cat-${cat.id}`}
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
              />
              <label className="form-check-label" htmlFor={`cat-${cat.id}`}>
                {cat.name}
              </label>
            </div>
          ))}
          {selectedCategories.length > 0 && (
            <button className="btn btn-dark" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
          <p className="mt-2">
            Mostrando{" "}
            {renderMode === "search"
              ? searchResults?.length || 0
              : filteredProducts.length}{" "}
            de {products.length} productos
          </p>
        </div>

        <div className="product-grid">
          {renderMode === "search" && (
            <>
              <h4 className="text-center w-100">Resultados encontrados</h4>
              <div className="empty-card"></div>
              {searchResults
                .slice(startIndex, startIndex + itemsPerPage)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </>
          )}

          {renderMode === "no-results" && (
            <div className="text-center w-100">
              <h4>No se encontraron resultados</h4>
            </div>
          )}

          {renderMode === "featured" &&
            currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>

      <div className="pagination">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>
          Inicio
        </button>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
