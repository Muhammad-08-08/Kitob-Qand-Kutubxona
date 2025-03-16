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
    const pages = new Set<number | string>();

    pages.add(1);

    const left = Math.max(2, page - 3); 
    const right = Math.min(totalPages - 1, page + 3);

    if (left > 2) pages.add("...");

    for (let i = left; i <= right; i++) {
      pages.add(i);
    }

    if (right < totalPages - 1) pages.add("...");

    if (totalPages > 1) pages.add(totalPages);

    return Array.from(pages);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <Button
        variant="outline"
        className={cn(
          "px-3 py-2",
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
            className="px-3 py-2"
            onClick={() => onPageChange(Number(p))}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        className={cn(
          "px-3 py-2",
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
