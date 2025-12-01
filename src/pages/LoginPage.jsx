import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력하세요.');
      return;
    }
    setLoading(true);
    try {
      await login({ username, password });
      navigate('/board');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white border rounded p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">로그인</h2>
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">아이디</label>
          <input className="w-full border rounded px-3 py-2 text-sm" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          <input type="password" className="w-full border rounded px-3 py-2 text-sm" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
        </div>
        <button className="btn-primary text-sm w-full disabled:opacity-60" type="submit" disabled={loading}>{loading ? '로그인 중...' : '로그인'}</button>
      </form>
      <div className="text-xs text-gray-600 mt-3">계정이 없나요? <Link className="text-primary hover:underline" to="/register">회원가입</Link></div>
    </div>
  );
}
