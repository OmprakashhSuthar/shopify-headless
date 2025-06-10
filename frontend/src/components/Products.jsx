/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { FiX } from "react-icons/fi";
import ProductFilters from "./ProductFilters";
import "./Product.css";
import "./FilterSlider.css";

const PRODUCTS_PER_PAGE = 12;
const API_URL = "http://localhost:8080/shopify/customFilter";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [pageInfoMap, setPageInfoMap] = useState({ 1: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);

  console.log("formattedFilters");
  console.log(filteredValues);

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams({ limit: PRODUCTS_PER_PAGE });
      const pageInfo = pageInfoMap[currentPage];
      if (pageInfo) queryParams.append("after", pageInfo);

      try {
        const res = await fetch(`${API_URL}?${queryParams}`);
        const data = await res.json();

        setProducts(data.products.products);
        setFilters(data.filters);

        if (data.nextPageCursor && !pageInfoMap[currentPage + 1]) {
          setPageInfoMap((prev) => ({
            ...prev,
            [currentPage + 1]: data.nextPageCursor,
          }));
          setTotalPages((prev) => Math.max(prev, currentPage + 1));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <>
      {/* {filteredValues ? filteredValues.join(", ") : ""} */}
      <div className="products-wrapper">
        <div className="plp-header">
          <h1 className="page-title">Products</h1>
          <button
            className="filter-button"
            onClick={() => setShowFilters(true)}
          >
            Filter
          </button>
        </div>

        {/* Filter Panel */}
        <div className={`filter-slider ${showFilters ? "open" : ""}`}>
          <div className="filter-slider-header">
            <h2>Filters</h2>
            <button
              className="close-button"
              onClick={() => setShowFilters(false)}
            >
              <FiX />
            </button>
          </div>
          <ProductFilters
            filters={filters}
            setFilteredValues={setFilteredValues}
            filteredValues={filteredValues}
          />
        </div>

        <div className="product-grid">
          {products?.length > 0 ? (
            products.map((product) => {
              const imageSrc = product.featuredImage?.url;
              const price = parseFloat(
                product.priceRange.minVariantPrice.amount
              );

              return (
                <div key={product.id} className="product-card">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={product.title}
                      className="product-image"
                    />
                  )}
                  <div className="product-info">
                    <p className="product-title">{product.title}</p>
                    <p className="product-price">${price.toFixed(2)}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products found or failed to fetch.</p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            if (page > 0 && page <= totalPages) {
              setCurrentPage(page);
            }
          }}
        />
      </div>
    </>
  );
}
