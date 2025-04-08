'use client'

import { useLayoutEffect, useState } from "react";

const Pagination = ({
  pages
}: {
  pages: React.ReactNode[];
}) => {

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const content = document.getElementById('pagination-top');
    if (content) {
      content.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    window.history.pushState(null, '', `#page-${page}`);
  };

  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const page = parseInt(hash.replace('#page-', ''));
      if (!isNaN(page) && page > 0 && page <= pages.length) {
        handlePageChange(page);
      }
    }
  }, []);

  return (
    <div style={{
      position: 'relative',
    }}>
      <div id='pagination-top' style={{
        position: 'absolute',
        top: '-100px',
        left: '0',
        width: '100%',
        height: '1px',
        visibility: 'hidden'
      }}/>
      <div className="mb-4">
        {pages[currentPage - 1]}
      </div>
      <nav>
        <ul className="flex" style={{marginTop: '2rem'}}>
          {pages.map((page, idx) => (
            <li key={idx}>
              <button
                className={`px-3 py-1 rounded ${idx+1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                style={{
                  backgroundColor: idx + 1 === currentPage ? '#3b82f6' : 'transparent',
                  color: idx + 1 === currentPage ? '#ffffff' : 'inherit',
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease',
                  marginInline: '4px',
                  outline: 'none'
                }}
                onClick={() => handlePageChange(idx + 1)}
                disabled={page === currentPage}
              >
                {idx + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;