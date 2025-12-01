import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold"><Link to="/board">게시판 서비스</Link></h1>
          <nav className="space-x-4 text-sm flex items-center">
            <Link className="hover:underline" to="/board">목록</Link>
            {!user && (
              <>
                <Link className="hover:underline" to="/login">로그인</Link>
                <Link className="hover:underline" to="/register">회원가입</Link>
              </>
            )}
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-xs opacity-90">안녕하세요, {user.username}</span>
                <button className="btn-secondary text-xs" onClick={() => { logout(); navigate('/login'); }}>로그아웃</button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-gray-100 text-xs text-gray-600 py-4">
        <div className="max-w-5xl mx-auto px-4">© {new Date().getFullYear()} 게시판 데모</div>
      </footer>
    </div>
  );
}
