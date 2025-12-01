import React from 'react';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-2 justify-center mt-4 flex-wrap">
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 rounded border text-sm ${p === page ? 'bg-primary text-white border-primary' : 'bg-white hover:bg-gray-100'}`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
