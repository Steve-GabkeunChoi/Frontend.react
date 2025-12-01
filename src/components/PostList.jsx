import React, { useMemo } from 'react';
import PostItem from './PostItem.jsx';
import Pagination from './Pagination.jsx';

export default function PostList({ posts, page, perPage, onPageChange, query }) {
  const filtered = useMemo(() => {
    if (!query) return posts;
    const q = query.toLowerCase();
    return posts.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
  }, [posts, query]);

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const start = (page - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  return (
    <div>
      <ul className="space-y-3">
        {current.map(p => <PostItem key={p.id} post={p} />)}
        {current.length === 0 && <li className="text-sm text-gray-500">게시글이 없습니다.</li>}
      </ul>
      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}
