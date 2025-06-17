import React, { useState, useEffect } from "react";

const ProductVariants = ({ variants, onVariantChange }) => {
  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const colors = [];
    const sizes = [];

    variants.edges.forEach((variant) => {
      variant.node.selectedOptions.forEach((option) => {
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
    });

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
    const selectedVariant = variants.edges.find((variant) => {
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
