import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext.jsx';
import * as postsService from '../services/postsService.js';
import PostForm from '../components/PostForm.jsx';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removePost, updatePost } = usePosts();
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const p = postsService.incrementViews(id);
    setPost(p || postsService.get(id));
  }, [id]);

  if (!post) return <div className="text-sm text-gray-500">존재하지 않는 게시글입니다.</div>;

  function handleDelete() {
    if (confirm('삭제하시겠습니까?')) {
      removePost(post.id);
      navigate('/board');
    }
  }

  function handleUpdate(data) {
    const updated = updatePost(post.id, data);
    setPost(updated);
    setEditing(false);
  }

  return (
    <div className="space-y-4">
      {!editing && (
        <article className="bg-white p-5 rounded border shadow-sm space-y-3">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <div className="text-xs text-gray-500 flex gap-3">
            <span>작성: {post.author}</span>
            <span>생성: {new Date(post.createdAt).toLocaleString()}</span>
            <span>수정: {new Date(post.updatedAt).toLocaleString()}</span>
            <span>조회: {post.views}</span>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{post.content}</div>
          <div className="flex gap-2 pt-2">
            <button className="btn-primary text-sm" onClick={() => setEditing(true)}>수정</button>
            <button className="btn-secondary text-sm" onClick={handleDelete}>삭제</button>
          </div>
        </article>
      )}
      {editing && (
        <div>
          <h3 className="text-lg font-semibold mb-2">글 수정</h3>
          <PostForm initial={post} onSubmit={handleUpdate} />
        </div>
      )}
    </div>
  );
}
