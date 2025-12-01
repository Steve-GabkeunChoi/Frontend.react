import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as postsService from '../services/postsService.js';

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPosts(postsService.list());
    setLoading(false);
  }, []);

  const createPost = useCallback((data) => {
    const newPost = postsService.create(data);
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  }, []);

  const updatePost = useCallback((id, data) => {
    const updated = postsService.update(id, data);
    setPosts((prev) => prev.map(p => p.id === id ? updated : p));
    return updated;
  }, []);

  const removePost = useCallback((id) => {
    postsService.remove(id);
    setPosts((prev) => prev.filter(p => p.id !== id));
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading, createPost, updatePost, removePost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
