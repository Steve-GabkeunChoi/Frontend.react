import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(q);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input className="flex-1 border rounded px-3 py-2 text-sm" placeholder="제목 또는 내용 검색" value={q} onChange={e => setQ(e.target.value)} />
      <button className="btn-secondary text-sm" type="submit">검색</button>
    </form>
  );
}
