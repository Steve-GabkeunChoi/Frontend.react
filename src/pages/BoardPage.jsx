import React, { useState } from 'react';
import { usePosts } from '../context/PostsContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import PostForm from '../components/PostForm.jsx';
import SearchBar from '../components/SearchBar.jsx';
import PostList from '../components/PostList.jsx';

export default function BoardPage() {
  const { posts, createPost } = usePosts();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  function handleCreate(data) {
    const payload = { ...data, author: data.author || user?.displayName || user?.username || '익명' };
    createPost(payload);
    setPage(1);
  }

  function handleSearch(q) {
    setQuery(q);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-2">글 작성</h2>
        <PostForm onSubmit={handleCreate} />
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">게시글 목록</h2>
        <SearchBar onSearch={handleSearch} />
        <PostList posts={posts} page={page} perPage={5} onPageChange={setPage} query={query} />
      </section>
    </div>
  );
}
