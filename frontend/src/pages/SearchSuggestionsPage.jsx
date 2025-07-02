/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiFunctions from "../util/http";
import ProductTiles from "../components/ProductTiles";

export default function SearchSuggestionsPage() {
  const query = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.q.length >= 3) {
        try {
          const response = await apiFunctions.fetchSearchSuggestions(query.q);
          setProducts(response.searchSuggestions.data.products.edges || []);
        } catch (error) {
          console.error("Failed to fetch search suggestions:", error);
        }
      } else {
        setProducts([]);
      }
    };

    fetchSuggestions();
  }, [query.q]);

  return (
    <div className="products-wrapper">
      {products.length > 0 && (
        <h1 className="page-title">
          Search Results for <span className="queryName">{query.q}</span>!
        </h1>
      )}
      {products.length === 0 ? (
        <h1 className="notFound">
          No products are available with name{" "}
          <span className="queryName">{query.q}</span>!
        </h1>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductTiles product={product.node} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}
