import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  console.log("Product data:", product);
  const mainImage = Array.isArray(product.imageUrls) && product.imageUrls.length > 0
  ? product.imageUrls[0]
  : "/assets/default.jpg";


  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img 
          src={mainImage} 
          alt={product.name} 
          className="product-image"
        />
        <h3>{product.name}</h3>
      </Link>
    </div>
  );
};

export default ProductCard;
