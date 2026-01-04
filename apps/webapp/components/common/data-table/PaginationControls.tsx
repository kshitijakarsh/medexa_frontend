"use client";

import { Button } from "@workspace/ui/components/button";
import { useDictionary } from "@/i18n/use-dictionary";

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
  const dict = useDictionary();
  const t = dict.pagination;

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
        {t.first}
      </Button>

      {/* Prev */}
      <Button
        size="sm"
        variant="outline"
        disabled={page === 1}
        className={`cursor-pointer`}
        onClick={() => onPageChange(page - 1)}
      >
        {t.previous}
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
        {t.next}
      </Button>

      {/* Last */}
      <Button
        size="sm"
        variant="outline"
        disabled={page === totalPages || totalPages === 0}
        className={`cursor-pointer`}
        onClick={() => onPageChange(totalPages)}
      >
        {t.last}
      </Button>
    </div >
  );
}
