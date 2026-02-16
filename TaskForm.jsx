
import React, { useState } from 'react';

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'grid', gap:12}}>
      <label>
        <div>Title</div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g., Prepare release notes" style={inputStyle} />
      </label>
      <label>
        <div>Description</div>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Optional" rows={3} style={{...inputStyle, resize:'vertical'}} />
      </label>
      <button type="submit" style={btnStyle}>➕ Add Task</button>
    </form>
  );
}

const inputStyle = { width: '100%', padding: '10px 12px', background:'#0f1430', border: '1px solid #273365', color:'#e7eaf6', borderRadius:8 };
const btnStyle = { padding:'10px 12px', background:'#2a6cff', border:'1px solid #315fe6', color:'white', borderRadius:8, cursor:'pointer' };
