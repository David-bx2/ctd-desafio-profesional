import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: "",
    featureIds: [],
    imageUrls: [],
  });

  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes, featuresRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/products/${id}`),
          axios.get("http://localhost:8080/api/categories"),
          axios.get("http://localhost:8080/api/features"),
        ]);

        const prod = productRes.data;
        setProduct({
          name: prod.name,
          description: prod.description,
          categoryId: prod.category?.id || "",
          featureIds: prod.features?.map(f => f.id) || [],
          imageUrls: prod.imageUrls || [],
        });
        setCategories(categoriesRes.data);
        setFeatures(featuresRes.data);
      } catch (err) {
        setError("Error cargando datos del producto");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFeatureToggle = (featureId) => {
    const updatedFeatures = product.featureIds.includes(featureId)
      ? product.featureIds.filter(id => id !== featureId)
      : [...product.featureIds, featureId];

    setProduct({ ...product, featureIds: updatedFeatures });
  };

  const handleImageUpload = (e) => {
    setNewImages([...newImages, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let uploadedImageUrls = [...product.imageUrls];

      for (let file of newImages) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("productName", product.name);

        const uploadRes = await axios.post("http://localhost:8080/api/uploads/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedImageUrls.push(uploadRes.data);
      }

      const updatedProduct = {
        name: product.name,
        description: product.description,
        imageUrls: uploadedImageUrls,
        category: { id: parseInt(product.categoryId) },
        features: product.featureIds.map(id => ({ id })),
      };

      await axios.put(`http://localhost:8080/api/products/${id}`, updatedProduct);
      alert("Producto actualizado correctamente");
      navigate("/admin/products");
    } catch (error) {
      setError(error.response?.data || "Error al actualizar producto");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Producto</h2>
      {error && <p className="text-danger">{typeof error === 'string' ? error : error.error || "Error inesperado"}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea name="description" className="form-control" value={product.description} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría:</label>
          <select name="categoryId" className="form-control" value={product.categoryId} onChange={handleChange} required>
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Características:</label>
          {features.map((feature) => (
            <div key={feature.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={product.featureIds.includes(feature.id)}
                onChange={() => handleFeatureToggle(feature.id)}
                id={`feature-${feature.id}`}
              />
              <label className="form-check-label" htmlFor={`feature-${feature.id}`}>
                {feature.name} ({feature.detail})
              </label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Imágenes existentes:</label>
          <div className="d-flex flex-wrap">
            {product.imageUrls.map((url, index) => (
              <img key={index} src={url} alt="img" style={{ width: "100px", margin: "5px" }} />
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Añadir nuevas imágenes:</label>
          <input type="file" className="form-control" multiple onChange={handleImageUpload} />
        </div>

        <button type="submit" className="btn btn-success">Actualizar Producto</button>
        <Link to="/admin/products" className="btn btn-secondary ms-2">Cancelar</Link>
      </form>
    </div>
  );
};

export default EditProduct;
