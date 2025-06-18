/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import Pagination from "../components/Pagination";
import ProductFilters from "../components/ProductFilters";
import ProductTiles from "../components/ProductTiles";
import "./Product.css";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import apiFunctions from "../util/http";

export default function Products() {
  const [pageInfoMap, setPageInfoMap] = useState({ 1: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredValues, setFilteredValues] = useState([]);
  const { id: collectionId } = useParams();

  // useEffect(() => {
  //   setPageInfoMap({ 1: null });
  //   setCurrentPage(1);
  //   setTotalPages(1);
  // }, [filteredValues, collectionId]);

  const pageInfo = pageInfoMap[currentPage];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "products",
      "filters",
      currentPage,
      filteredValues,
      collectionId,
    ],
    queryFn: () =>
      apiFunctions.fetchProducts(pageInfo, filteredValues, collectionId),
    keepPreviousData: true,
  });

  const { products, filters } = data || {};

  useEffect(() => {
    if (data?.nextPageCursor && !pageInfoMap[currentPage + 1]) {
      setPageInfoMap((prev) => ({
        ...prev,
        [currentPage + 1]: data?.nextPageCursor,
      }));
      setTotalPages((prev) => Math.max(prev, currentPage + 1));
    }
    if (filteredValues.length > 0) {
      setPageInfoMap({ 1: null });
      setCurrentPage(1);
      setTotalPages(1);
    }
  }, [data, currentPage, pageInfoMap, filteredValues]);

  return (
    <>
      <div className="products-wrapper">
        <div className="plp-header">
          <h1 className="page-title">Products</h1>
          <button
            className="filter-button"
            onClick={() => setShowFilters(true)}
          >
            <FiFilter style={{ marginRight: "6px" }} />
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
          {isLoading ? (
            <p>Product Loading...</p>
          ) : isError ? (
            <p>Error in loading products: {error.message}</p>
          ) : products.length > 0 ? (
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
