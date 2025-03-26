import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeatureList = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({ name: "", icon: "", detalle: "" });

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/features");
      setFeatures(res.data);
    } catch (error) {
      console.error("Error al cargar características:", error);
    }
  };

  const handleChange = (e) => {
    setNewFeature({ ...newFeature, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/features", newFeature);
      setNewFeature({ nombre: "", icono: "", detalle: "" });
      fetchFeatures();
    } catch (error) {
      console.error("Error al añadir característica:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta característica?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/features/${id}`);
      fetchFeatures();
    } catch (error) {
      console.error("Error al eliminar característica:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Administrar Características</h2>

      <form onSubmit={handleAdd} className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="form-control"
              value={newFeature.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="icon"
              placeholder="Icono"
              className="form-control"
              value={newFeature.icon}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              name="detalle"
              placeholder="Detalle"
              className="form-control"
              value={newFeature.detalle}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">Añadir</button>
          </div>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Icono</th>
            <th>Detalle</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.id}>
              <td>{feature.name}</td>
              <td>{feature.icon}</td>
              <td>{feature.detalle}</td>
              <td>
                {/* Edición opcional */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(feature.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center gap-3 mt-4">
      <Link to="/admin" className="btn btn-dark">⬅️ Volver al Panel</Link>
      </div>
    </div>
  );
};

export default FeatureList;
