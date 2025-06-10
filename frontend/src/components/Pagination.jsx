import "./Pagination.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`page-button ${currentPage === 1 ? "disabled" : ""}`}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`page-button ${page === currentPage ? "active" : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`page-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
}
