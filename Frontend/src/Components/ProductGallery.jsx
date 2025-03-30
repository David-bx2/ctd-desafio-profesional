import { useState } from "react";
import "../styles/ProductGallery.css";

const ProductGallery = ({ images }) => {
  const [showAllImages, setShowAllImages] = useState(false);

  if (!images || images.length === 0) return <p>No hay imágenes disponibles</p>;

  const mainImage = images[0];
  const gridImages = images.slice(1, 5);

  return (
    <div className="product-gallery">
      <div className="gallery-container">
        <div className="main-image">
          <img src={mainImage} alt="Imagen principal del producto" />
        </div>
        <div className="grid-images">
          {gridImages.map((img, index) => (
            <img key={index} src={img} alt={`Imagen ${index + 1}`} />
          ))}
        </div>
      </div>
      <button className="view-more" onClick={() => setShowAllImages(true)}>
        Ver más
      </button>

      {showAllImages && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close" onClick={() => setShowAllImages(false)}>
              ✖
            </button>
            <div className="image-scroll-container">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className="full-image"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
