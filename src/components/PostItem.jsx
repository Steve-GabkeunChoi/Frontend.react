import React from 'react';
import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
  return (
    <li className="bg-white border rounded p-4 flex flex-col gap-1 hover:shadow-sm transition">
      <Link to={`/posts/${post.id}`} className="text-lg font-semibold text-primary hover:underline">
        {post.title}
      </Link>
      <p className="text-sm text-gray-600 line-clamp-2">{post.content.slice(0, 120)}{post.content.length > 120 ? '…' : ''}</p>
      <div className="text-xs text-gray-500 flex gap-3">
        <span>작성: {post.author}</span>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
        <span>조회수: {post.views}</span>
      </div>
    </li>
  );
}
