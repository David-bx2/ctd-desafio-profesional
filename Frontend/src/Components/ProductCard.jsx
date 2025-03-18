import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  console.log("Product data:", product);
  const mainImage = product.imageUrl  
  ? product.imageUrl  // Ahora usa `imageUrl` en vez de `imageUrls[0]`
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
