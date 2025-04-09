import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    images: [],
    categoryId: "",
    selectedFeatures: [],
  });

  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, featRes] = await Promise.all([
          axios.get("http://localhost:8080/api/categories"),
          axios.get("http://localhost:8080/api/features"),
        ]);
        setCategories(catRes.data);
        setFeatures(featRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFeatureToggle = (featureId) => {
    setProduct((prev) => {
      const exists = prev.selectedFeatures.includes(featureId);
      const updated = exists
        ? prev.selectedFeatures.filter((id) => id !== featureId)
        : [...prev.selectedFeatures, featureId];
      return { ...prev, selectedFeatures: updated };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrls = [];

      for (let file of imageFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("productName", product.name);

        const uploadRes = await axios.post(
          "http://localhost:8080/api/uploads/image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        imageUrls.push(uploadRes.data);
      }

      const productData = {
        name: product.name,
        description: product.description,
        imageUrls,
        category: { id: parseInt(product.categoryId) },
        features: product.selectedFeatures.map((id) => ({ id })),
      };

      await axios.post("http://localhost:8080/api/products", productData);

      alert("Producto agregado correctamente");
      setProduct({
        name: "",
        description: "",
        images: [],
        categoryId: "",
        selectedFeatures: [],
      });
      setImageFiles([]);
      setError("");
    } catch (error) {
      setError(error.response?.data || "Error al agregar el producto");
    }
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Producto</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descripción:</label>
          <textarea
            name="description"
            className="form-control"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Categoría:</label>
          <select
            name="categoryId"
            className="form-control"
            value={product.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Características:</label>
          <div className="form-check">
            {features.map((feat) => (
              <div key={feat.id}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`feature-${feat.id}`}
                  checked={product.selectedFeatures.includes(feat.id)}
                  onChange={() => handleFeatureToggle(feat.id)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`feature-${feat.id}`}
                >
                  {feat.name} ({feat.icon})
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label>Imágenes:</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleImageUpload}
          />
          <div className="mt-2">
            {imageFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="preview"
                style={{ width: "100px", margin: "5px" }}
              />
            ))}
          </div>
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            💾 Guardar Producto
          </button>
          <Link to="/admin" className="btn btn-dark">
            ⬅️ Volver al Panel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
