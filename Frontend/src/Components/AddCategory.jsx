import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    imageUrl: ""
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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

    const { name, description, imageUrl } = category;
    const newCategory = { name, description, imageUrl };

    try {
      await axios.post("http://localhost:8080/api/categories", newCategory);
      setMessage("Categoría creada exitosamente");
      setCategory({ name: "", description: "", imageUrl: "" });
      fetchCategories();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setMessage("Error al crear la categoría");
    }
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await axios.delete(`http://localhost:8080/api/categories/${categoryToDelete.id}`);
      setMessage("Categoría eliminada exitosamente");
      setShowModal(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Error al eliminar la categoría. Verifica si tiene productos asociados.");
    }
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/admin" className="btn btn-dark">⬅️ Volver al Panel</Link>
      </div>

      <div className="mb-3">
        <button className="btn btn-outline-dark w-100" onClick={() => setShowForm(!showForm)}>
          {showForm ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />}
          Agregar Categoría
        </button>
      </div>

      {showForm && (
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
          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-dark">Guardar</button>
          </div>
        </form>
      )}

      {message && <div className="alert alert-info">{message}</div>}

      <h4>Categorías Existentes</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Acciones</th>
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
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(cat)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && categoryToDelete && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar la categoría "{categoryToDelete.name}"?</p>
                <p className="text-danger">Esta acción no se puede deshacer. Si hay productos asociados, no se podrá eliminar.</p>
              </div>
              <div className="modal-footer">
                <button onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button onClick={confirmDelete} className="btn btn-danger">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
