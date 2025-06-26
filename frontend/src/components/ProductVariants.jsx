import React, { useState, useEffect } from "react";

const ProductVariants = ({ pid, onVariantChange }) => {
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("L");
  const [colorDetails, setColorDetails] = useState({});

  useEffect(() => {
    async function fetchVariants() {
      const API_URL = "http://localhost:8080/shopify/getVarients";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: pid,
        }),
      });
      const data = await response.json();

      setColorDetails(data.colorDetails || {});
      setColorOptions(data.availableColors || []);
    }

    fetchVariants();
  }, [pid]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize("L");
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const getPriceForSelectedSize = () => {
    const selectedClr = colorDetails[selectedColor];
    if (selectedClr) {
      const sizeObj = selectedClr.sizes.find(
        (sizeObj) => sizeObj.size === selectedSize
      );
      if (sizeObj) {
        return `${sizeObj.price.amount} ${sizeObj.price.currencyCode}`;
      }
    }
    return null;
  };
  const price = getPriceForSelectedSize();

  return (
    <div className="product-options">
      <div className="color-options flex">
        {colorOptions.length > 0 && (
          <>
            <h4>Color:</h4>
            <div className="buttons">
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(color)}
                  className={`color-button ${
                    selectedColor === color ? "selected" : ""
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedColor && colorDetails[selectedColor] && (
        <div className="size-options flex">
          <h4>Available Sizes:</h4>
          <div className="buttons">
            {colorDetails[selectedColor].sizes.map((size, index) => (
              <>
                <button
                  key={index}
                  onClick={() => handleSizeChange(size.size)}
                  className={`size-button ${
                    selectedSize === size.size ? "selected" : ""
                  }`}
                >
                  {size.size}
                </button>
              </>
            ))}
          </div>
        </div>
      )}

      {selectedColor && (
        <div className="variant-details">
          <p>
            <strong>Price: </strong>
            <span className="price">$: {price}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductVariants;
