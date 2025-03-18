import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Función para eliminar un producto
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id)); // 🔥 Actualiza la lista
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="container product-list">
      <h2>Lista de Productos</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  <Link to={`/product/${product.id}`} className="btn btn-info">
                    🔍 Ver
                  </Link>
                  <Link to={`/admin/edit-product/${product.id}`} className="btn btn-warning">
                    ✏️ Editar
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/administracion" className="btn btn-dark">⬅️ Volver al Panel</Link>
    </div>
  );
};

export default ProductList;
