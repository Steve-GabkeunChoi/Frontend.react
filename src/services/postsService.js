const STORAGE_KEY = 'bb_posts';

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

function save(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function list() {
  return load().sort((a, b) => b.createdAt - a.createdAt);
}

export function get(id) {
  return load().find(p => p.id === id);
}

export function create({ title, content, author }) {
  const posts = load();
  const now = Date.now();
  const newPost = { id: crypto.randomUUID(), title, content, author: author || '익명', createdAt: now, updatedAt: now, views: 0 };
  posts.push(newPost);
  save(posts);
  return newPost;
}

export function update(id, { title, content }) {
  const posts = load();
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) throw new Error('Post not found');
  posts[idx] = { ...posts[idx], title, content, updatedAt: Date.now() };
  save(posts);
  return posts[idx];
}

export function remove(id) {
  const posts = load().filter(p => p.id !== id);
  save(posts);
}

export function incrementViews(id) {
  const posts = load();
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return;
  posts[idx].views += 1;
  save(posts);
  return posts[idx];
}
