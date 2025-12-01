import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BoardPage from './pages/BoardPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import { PostsProvider } from './context/PostsContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

export default function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/board" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/board" element={
              <ProtectedRoute>
                <BoardPage />
              </ProtectedRoute>
            } />
            <Route path="/posts/:id" element={<PostDetailPage />} />
          </Routes>
        </Layout>
      </PostsProvider>
    </AuthProvider>
  );
}
