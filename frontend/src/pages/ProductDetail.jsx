import { useState } from "react";
import { useParams } from "react-router";
import "./ProductDetail.css";
import ProductVariants from "../components/ProductVariants";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import apiFunctions from "../util/http";
import Spinner from "../components/Spinner";
import Errorpage from "./Errorpage";

export default function ProductDetails() {
  const { id: pid } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Example of useEffect to fetch the API
  //   useEffect(() => {
  //   const fetchProductDetails = async () => {
  //     try {
  //       const res = await fetch(API_URL, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ productID: pid }),
  //       });
  //       const productDetails = await res.json();
  //       setProductDetail(productDetails.productData.product);
  //     } catch (error) {
  //       console.error("Failed to fetch product details:", error);
  //     }
  //   };

  //   fetchProductDetails();
  // }, [pid]);

  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [pid],
    queryFn: () => apiFunctions.fetchProductDetails(pid),
    enabled: !!pid,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Errorpage errorMsg={"error aa rahi h bhai"} />;
  }

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
          productDetail.productDetails.featuredImage && (
            <img
              src={productDetail.productDetails.featuredImage.src || "null"}
              alt={
                productDetail.productDetails.featuredImage.altText || "Image"
              }
            />
          )
        )}
      </div>
      <div className="productDetails">
        <h2 className="title">{productDetail.productDetails.title}</h2>
        <p className="description">
          {productDetail.productDetails.description}
        </p>
        <div className="productInfo">
          {productDetail.productDetails?.vendor && (
            <div className="vendor">
              <span className="vendor-text">Vendor:</span>{" "}
              <span className="vendor-info">
                {productDetail.productDetails.vendor}
              </span>
            </div>
          )}
          {productDetail.productDetails.tags &&
            productDetail.productDetails.tags.length > 0 && (
              <div className="tags">
                {productDetail.productDetails.tags.map((tag, index) => (
                  <span className="tag" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
        </div>
        {productDetail.productDetails.variantsCount.count <= 1 &&
          productDetail.productDetails?.priceRange?.minVariantPrice?.amount && (
            <>
              <div className="product-price">
                <span className="price-text">Price: </span>
                <p className="price-info">
                  $
                  {
                    productDetail.productDetails.priceRange.minVariantPrice
                      .amount
                  }
                </p>
              </div>
            </>
          )}
        {productDetail.productDetails.variantsCount.count &&
          productDetail.productDetails.variantsCount.count > 1 && (
            <ProductVariants pid={pid} onVariantChange={handleVariantChange} />
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
