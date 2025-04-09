"use client";

import { createPagination } from "@/app/_helpers";
import { useSearchParams } from "next/navigation";
import { Suspense, useLayoutEffect, useMemo, useState } from "react";

type PaginationProps = {
  pages: React.ReactNode[];
};

const PaginationComponent = ({ pages }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const content = document.getElementById("pagination-top");
    if (content) {
      content.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState(null, "", url.toString());
  };

  useLayoutEffect(() => {
    if (queryPage) {
      const page = parseInt(queryPage as string);
      if (!isNaN(page) && page > 0 && page <= pages.length) {
        handlePageChange(page);
      }
    }
  }, [queryPage, pages.length]);

  const pagination = useMemo(() => {
    if (!pages.length) return [];
    const totalPages = pages.length;
    return createPagination(totalPages, currentPage);
  }, [pages.length, currentPage]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        id="pagination-top"
        style={{
          position: "absolute",
          top: "-100px",
          left: "0",
          width: "100%",
          height: "1px",
          visibility: "hidden",
        }}
      />
      <div className="mb-4">{pages[currentPage - 1]}</div>
      <nav>
        <ul className="flex" style={{ marginTop: "2rem" }}>
          {pagination.map((page, idx) => (
            <li key={idx}>
              {page === "..." ? (
                <span
                  style={{
                    padding: "0 8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {page}
                </span>
              ) : (
                <button
                  style={{
                    backgroundColor:
                      page === currentPage ? "#3b82f6" : "transparent",
                    color: page === currentPage ? "#ffffff" : "inherit",
                    width: "2rem",
                    height: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                    marginInline: "4px",
                    outline: "none",
                  }}
                  onClick={() => handlePageChange(page as number)}
                  disabled={page === currentPage}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const Pagination = (props: PaginationProps) => {
  return (
    <Suspense fallback={<div />}>
      <PaginationComponent {...props} />
    </Suspense>
  );
};

export default Pagination;
