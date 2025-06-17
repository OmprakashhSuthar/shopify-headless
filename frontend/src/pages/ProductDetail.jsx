import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetail.css";
import ProductVariants from "../components/ProductVariants";
import { FiMinus, FiPlus } from "react-icons/fi";

const API_URL = "http://localhost:8080/shopify/productDetails";

export default function ProductDetails() {
  const { id: pid } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productID: pid }),
        });
        const productDetails = await res.json();
        setProductDetail(productDetails.productData.product);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [pid]);

  function handleDecrease() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleIncrease() {
    setQuantity(quantity + 1);
  }

  const handleVariantChange = (selectedVariant) => {
    if (selectedVariant?.node?.image?.url) {
      setSelectedImage(selectedVariant.node.image.url);
    }
  };

  return (
    <div className="productDetailsContainer">
      <div className="productImageSection">
        {selectedImage ? (
          <img src={selectedImage} alt="Selected Product" />
        ) : (
          productDetail.featuredImage && (
            <img
              src={productDetail.featuredImage.src || "null"}
              alt={productDetail.featuredImage.altText || "Image"}
            />
          )
        )}
      </div>
      <div className="productDetails">
        <h2 className="title">{productDetail.title}</h2>
        <p className="description">{productDetail.description}</p>
        <div className="productInfo">
          {productDetail?.vendor && (
            <div className="vendor">
              <span className="vendor-text">Vendor:</span>{" "}
              <span className="vendor-info">{productDetail.vendor}</span>
            </div>
          )}
          {productDetail.tags && productDetail.tags.length > 0 && (
            <div className="tags">
              {productDetail.tags.map((tag, index) => (
                <span className="tag" key={index}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {productDetail?.priceRange?.minVariantPrice?.amount && (
          <div className="product-price">
            <p className="price">
              From ${productDetail.priceRange.minVariantPrice.amount}
            </p>
          </div>
        )}
        {productDetail.variants && productDetail.variants.edges.length > 1 && (
          <ProductVariants
            variants={productDetail.variants}
            onVariantChange={handleVariantChange}
          />
        )}
        <div className="quantity-section">
          <button className="minus" onClick={handleDecrease}>
            <FiMinus />
          </button>
          <input
            type="text"
            value={quantity}
            className="quantityField"
            onChange={(e) => setQuantity(e.target.value)}
            readOnly
          />
          <button className="plus" onClick={handleIncrease}>
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
