import React from "react";
import { Link } from "react-router-dom";

const SearchSuggestionLayout = ({ suggestions, handleClick }) => {
  const displayOnlySuggestions = suggestions.slice(0, 4);

  return (
    <div className="suggestion-box">
      {displayOnlySuggestions.length === 0 ? (
        <div className="suggestion-item">No suggestions found</div>
      ) : (
        <>
          <div className="categories-suggestions">
            <span className="suggestion-heading">Suggestions</span>
            <div className="category-suggestion-list">
              <p>Snowboard</p>
              <p>T-shirt</p>
              <p>Wallpaper</p>
              <p>Curtain</p>
              <p>Shirts</p>
              <p>Blogs</p>
              <p>Articles</p>
              <p>Trending Products</p>
            </div>
          </div>

          <div className="suggestion-item-container">
            <span className="suggestion-heading">Products</span>
            <div className="suggestion-items">
              {displayOnlySuggestions.map((item, index) => (
                <Link
                  key={index}
                  className="suggestion-item"
                  to={`/products/${item.node.handle}`}
                  onClick={handleClick}
                >
                  {item.node.featuredImage && (
                    <img
                      src={item.node.featuredImage.src}
                      alt={item.node.featuredImage.altText}
                      className="suggestion-image"
                    />
                  )}
                  <p className="product-name-title">{item.node.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchSuggestionLayout;
