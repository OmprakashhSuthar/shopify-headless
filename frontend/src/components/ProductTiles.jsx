import "./ProductTiles.css";
import { Link } from "react-router-dom";

export default function PtoductTiles({ product }) {
  const imageSrc = product.featuredImage?.url;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  return (
    <Link to={`/product/${product.handle}`} className="product-card">
      {imageSrc && (
        <img src={imageSrc} alt={product.title} className="product-image" />
      )}
      <div className="product-info">
        <p className="product-title">{product.title}</p>
        <p className="product-price">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
