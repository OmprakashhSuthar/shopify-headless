/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Pagination from "../components/Pagination";
import ProductFilters from "../components/ProductFilters";
import ProductTiles from "../components/ProductTiles";
import "./Product.css";

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

  useEffect(() => {
    setPageInfoMap({ 1: null });
    setCurrentPage(1);
    setTotalPages(1);
  }, [filteredValues]);

  useEffect(() => {
    const fetchProducts = async () => {
      const pageInfo = pageInfoMap[currentPage];

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            limit: PRODUCTS_PER_PAGE,
            after: pageInfo || null,
            filters: filteredValues,
          }),
        });

        const data = await res.json();
        setProducts(data.products.products);

        if (currentPage === 1) {
          setFilters(data.filters);
        }

        if (data.products.nextPageCursor && !pageInfoMap[currentPage + 1]) {
          setPageInfoMap((prev) => ({
            ...prev,
            [currentPage + 1]: data.products.nextPageCursor,
          }));
          setTotalPages((prev) => Math.max(prev, currentPage + 1));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    if (pageInfoMap.hasOwnProperty(currentPage)) {
      fetchProducts();
    }
  }, [currentPage, pageInfoMap, filteredValues]);

  return (
    <>
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
          {products.length > 0 ? (
            products.map((product) => (
              <ProductTiles product={product} key={product.id} />
            ))
          ) : (
            <p>No products found.</p>
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
