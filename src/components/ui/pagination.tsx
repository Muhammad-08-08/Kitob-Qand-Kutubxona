"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push("...");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (page < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <Button
        variant="outline"
        className={cn(
          "px-[7px] py-0 text-sm md:px-3 md:py-2",
          page === 1 && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        «
      </Button>

      {generatePageNumbers().map((p, index) =>
        p === "..." ? (
          <span key={`dots-${index}`} className="px-3 py-2">
            ...
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            className="px-[7px] py-0 text-sm md:px-3 md:py-2"
            onClick={() => onPageChange(Number(p))}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        className={cn(
          "px-[7px] py-0 text-sm md:px-3 md:py-2",
          page === totalPages && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        »
      </Button>
    </div>
  );
};
