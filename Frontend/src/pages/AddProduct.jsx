import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let imageUrls = [];

        // Subir imágenes primero
        if (imageFiles.length > 0) {
            for (let i = 0; i < imageFiles.length; i++) {
                const formData = new FormData();
                formData.append("file", imageFiles[i]);
                formData.append("productName", product.name);  // Enviar el nombre del producto
                
                const uploadResponse = await axios.post("http://localhost:8080/api/uploads/image", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                imageUrls.push(uploadResponse.data); // Guardar la URL de la imagen
            }
        }

        // Luego enviar el producto con las imágenes
        const productData = { ...product, imageUrls };
        await axios.post("http://localhost:8080/api/products", productData);

        alert("Producto agregado correctamente");
        setProduct({ name: "", description: "", imageUrls: [] });
        setImageFiles([]);
        setError("");
    } catch (error) {
        setError(error.response?.data || "Error al agregar el producto");
    }
};


  return (
    <div className="container mt-5">
      <h2>Agregar Producto</h2>
      {error && <p className="text-danger">{error}</p>}
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
          <label className="form-label">Imágenes:</label>
          <input type="file" className="form-control" multiple onChange={handleImageUpload} />
          <div className="mt-2">
            {imageFiles.map((file, index) => (
              <img key={index} src={URL.createObjectURL(file)} alt="preview" style={{ width: "100px", margin: "5px" }} />
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Guardar Producto</button>
      </form>
      <Link to="/administracion" className="btn btn-dark">⬅️ Volver al Panel</Link>
    </div>
  );
};

export default AddProduct;
