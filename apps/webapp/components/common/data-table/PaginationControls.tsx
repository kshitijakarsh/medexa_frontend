"use client";

import { Button } from "@workspace/ui/components/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ page, totalPages, onPageChange }: PaginationProps) {

  const pages = [];

  const maxToShow = 5;
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + maxToShow - 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex justify-center items-center gap-2 py-4">

      {/* First */}
      <Button
        size="sm"
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(1)}
      >
        First
      </Button>

      {/* Prev */}
      <Button
        size="sm"
        variant="outline"
        disabled={page === 1}
        className={`cursor-pointer`}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>

      {/* Pages numbered */}
      {pages.map((p) => (
        <Button
          key={p}
          size="sm"
          variant={p === page ? "default" : "outline"}
          onClick={() => onPageChange(p)}
          className={`cursor-pointer`}
          disabled={totalPages === 0}
        >
          {p}
        </Button>
      ))}

      {/* Next */}
      <Button
        size="sm"
        variant="outline"
        disabled={page === totalPages || totalPages === 0}
        className={`cursor-pointer`}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>

      {/* Last */}
      <Button
        size="sm"
        variant="outline"
        disabled={page === totalPages || totalPages === 0}
        className={`cursor-pointer`}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </Button>
    </div >
  );
}
