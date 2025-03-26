import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    imageUrl: ""
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error al obtener categorías", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    // Creamos un nuevo objeto SIN el campo id
    const { name, description, imageUrl } = category;
    const newCategory = { name, description, imageUrl };
  
    try {
      await axios.post("http://localhost:8080/api/categories", newCategory);
      setMessage("Categoría creada exitosamente");
      setCategory({ name: "", description: "", imageUrl: "" });
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Error al crear la categoría");
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>➕ Agregar Categoría</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            name="description"
            className="form-control"
            value={category.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen URL:</label>
          <input
            type="text"
            name="imageUrl"
            className="form-control"
            value={category.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button type="submit" className="btn btn-dark">Guardar</button>
          <Link to="/admin" className="btn btn-dark">⬅️ Volver al Panel</Link>
        </div>
      </form>

      {message && <div className="alert alert-info">{message}</div>}

      <h4>Categorías Existentes</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <img src={cat.imageUrl} alt={cat.name} width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddCategory;
