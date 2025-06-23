import React, { useState, useEffect } from "react";

const ProductVariants = ({ pid, onVariantChange }) => {
  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    async function fetchVarients() {
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
      setVariants(data.variants || []);
    }

    fetchVarients();
  }, [pid]);

  useEffect(() => {
    const colors = [];
    const sizes = [];

    if (variants.length > 0) {
      variants.forEach((variant) => {
        if (variant.node && variant.node.selectedOptions) {
          console.log("Called");
          variant.node.selectedOptions.forEach((option) => {
            console.log("option");
            console.log(option);
            if (
              option.name.toLowerCase() === "color" &&
              !colors.includes(option.value)
            ) {
              colors.push(option.value);
            }
            if (
              option.name.toLowerCase() === "size" &&
              !sizes.includes(option.value)
            ) {
              sizes.push(option.value);
            }
          });
        } else {
          console.warn(
            `Variant node or selectedOptions missing for variant: ${variant}`
          );
          console.log(variant);
        }
      });
    }

    setColorOptions(colors);
    setSizeOptions(sizes);
  }, [variants]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    updateSelectedVariant(color, selectedSize);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    updateSelectedVariant(selectedColor, size);
  };

  const updateSelectedVariant = (color, size) => {
    const selectedVariant = variants.find((variant) => {
      const colorOption = variant.node.selectedOptions.find(
        (option) =>
          option.name.toLowerCase() === "color" && option.value === color
      );
      const sizeOption = variant.node.selectedOptions.find(
        (option) =>
          option.name.toLowerCase() === "size" && option.value === size
      );
      return colorOption && sizeOption;
    });

    if (selectedVariant) {
      onVariantChange(selectedVariant);
      setErrorMessage("");
    } else {
      validateSelection();
    }
  };

  const validateSelection = () => {
    if (!selectedColor || !selectedSize) {
      setErrorMessage("Please select size and color to view product.");
      return false;
    }
    return true;
  };

  return (
    <div className="product-options">
      <div className="color-options flex">
        {colorOptions.length > 0 && (
          <>
            <h3>Color</h3>
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

      <div className="size-options flex">
        {sizeOptions.length > 0 && (
          <>
            <h3>Size</h3>
            <div className="buttons">
              {sizeOptions.map((size, index) => (
                <button
                  key={index}
                  onClick={() => handleSizeChange(size)}
                  className={`size-button ${
                    selectedSize === size ? "selected" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ProductVariants;
