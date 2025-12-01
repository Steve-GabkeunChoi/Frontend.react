import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const USERS_KEY = 'bb_users';
const SESSION_KEY = 'bb_session';

async function sha256(text) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(text));
  const arr = Array.from(new Uint8Array(buf));
  return arr.map(b => b.toString(16).padStart(2, '0')).join('');
}

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function loadSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
function saveSession(user) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(loadSession());
    setLoading(false);
  }, []);

  const register = useCallback(async ({ username, password, displayName, email }) => {
    const users = loadUsers();
    if (users.find(u => u.username === username)) {
      throw new Error('이미 존재하는 사용자입니다.');
    }
    if (!username || username.length < 3) {
      throw new Error('아이디는 3자 이상이어야 합니다.');
    }
    if (!password || password.length < 6) {
      throw new Error('비밀번호는 6자 이상이어야 합니다.');
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }
    const passwordHash = await sha256(password);
    const newUser = { id: crypto.randomUUID(), username, passwordHash, displayName: displayName || username, email: email || '' };
    users.push(newUser);
    saveUsers(users);
    saveSession(newUser);
    setUser(newUser);
    return newUser;
  }, []);

  const login = useCallback(async ({ username, password }) => {
    const users = loadUsers();
    const pwdHash = await sha256(password);
    const found = users.find(u => u.username === username && u.passwordHash === pwdHash);
    if (!found) throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
    saveSession(found);
    setUser(found);
    return found;
  }, []);

  const logout = useCallback(() => {
    saveSession(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
