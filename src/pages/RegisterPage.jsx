import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!username || username.length < 3) {
      setError('아이디는 3자 이상이어야 합니다.');
      return;
    }
    if (!password || password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('이메일 형식이 올바르지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      await register({ username, password, displayName, email });
      navigate('/board');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white border rounded p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">회원가입</h2>
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">아이디</label>
          <input className="w-full border rounded px-3 py-2 text-sm" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">표시 이름</label>
          <input className="w-full border rounded px-3 py-2 text-sm" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="게시판에 표시될 이름" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">이메일 (선택)</label>
          <input type="email" className="w-full border rounded px-3 py-2 text-sm" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@domain.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          <input type="password" className="w-full border rounded px-3 py-2 text-sm" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
          <input type="password" className="w-full border rounded px-3 py-2 text-sm" value={confirm} onChange={e => setConfirm(e.target.value)} />
        </div>
        <button className="btn-primary text-sm w-full disabled:opacity-60" type="submit" disabled={loading}>{loading ? '가입 중...' : '가입하기'}</button>
      </form>
      <div className="text-xs text-gray-600 mt-3">이미 계정이 있나요? <Link className="text-primary hover:underline" to="/login">로그인</Link></div>
    </div>
  );
}
