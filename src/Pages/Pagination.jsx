import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  // توليد أرقام الصفحات (ممكن نتحكم في عدد الأزرار المعروضة)
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <div className="join">
        {/* زر السابق */}
        <button
          className="join-item btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>

        {/* أرقام الصفحات */}
        {pages.map((page) => (
          <button
            key={page}
            className={`join-item btn ${
              currentPage === page ? "btn-active bg-blue-600 text-white" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* زر التالي */}
        <button
          className="join-item btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Pagination;
