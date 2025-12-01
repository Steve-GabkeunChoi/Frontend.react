import React, { useState, useEffect } from 'react';

export default function PostForm({ onSubmit, initial }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const [author, setAuthor] = useState(initial?.author || '');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setContent(initial.content);
      setAuthor(initial.author);
    }
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, content, author });
    if (!initial) {
      setTitle('');
      setContent('');
      setAuthor('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded border shadow-sm">
      <div>
        <label className="block text-sm font-medium mb-1">제목</label>
        <input className="w-full border rounded px-3 py-2 text-sm" value={title} onChange={e => setTitle(e.target.value)} placeholder="제목을 입력" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">내용</label>
        <textarea className="w-full border rounded px-3 py-2 text-sm h-32 resize-y" value={content} onChange={e => setContent(e.target.value)} placeholder="내용을 입력" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">작성자</label>
        <input className="w-full border rounded px-3 py-2 text-sm" value={author} onChange={e => setAuthor(e.target.value)} placeholder="이름(선택)" />
      </div>
      <div className="pt-2 flex gap-2">
        <button type="submit" className="btn-primary text-sm">{initial ? '수정 저장' : '글 등록'}</button>
        {initial && <button type="button" onClick={() => { setTitle(''); setContent(''); setAuthor(''); }} className="btn-secondary text-sm">취소</button>}
      </div>
    </form>
  );
}
