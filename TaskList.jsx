
import React, { useState } from 'react';

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) return <p>No tasks yet. Create your first task above.</p>;
  return (
    <ul style={{listStyle:'none', margin:0, padding:0, display:'grid', gap:12}}>
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);

  const save = async () => {
    await onUpdate(task.id, { title, description, status });
    setIsEditing(false);
  };

  return (
    <li style={{padding:12, border:'1px solid #273365', borderRadius:8}}>
      {isEditing ? (
        <div style={{display:'grid', gap:8}}>
          <input value={title} onChange={e=>setTitle(e.target.value)} style={inputStyle} />
          <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} style={{...inputStyle, resize:'vertical'}} />
          <select value={status} onChange={e=>setStatus(e.target.value)} style={inputStyle}>
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="done">done</option>
          </select>
          <div style={{display:'flex', gap:8}}>
            <button onClick={save} style={btnPrimary}>💾 Save</button>
            <button onClick={()=>setIsEditing(false)} style={btnSecondary}>✖ Cancel</button>
          </div>
        </div>
      ) : (
        <div style={{display:'grid', gap:8}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <strong>{task.title}</strong>
            <span style={{fontSize:12, opacity:.8}}>{new Date(task.createdAt).toLocaleString()}</span>
          </div>
          {task.description && <p style={{margin:'4px 0 0 0'}}>{task.description}</p>}
          <div style={{display:'flex', gap:8}}>
            <span style={{padding:'2px 8px', border:'1px solid #33407d', borderRadius:999}}>{task.status}</span>
            <button onClick={()=>setIsEditing(true)} style={btnSecondary}>✏ Edit</button>
            <button onClick={()=>onDelete(task.id)} style={btnDanger}>🗑 Delete</button>
          </div>
        </div>
      )}
    </li>
  );
}

const inputStyle = { width: '100%', padding: '10px 12px', background:'#0f1430', border: '1px solid #273365', color:'#e7eaf6', borderRadius:8 };
const btnPrimary = { padding:'8px 10px', background:'#2a6cff', border:'1px solid #315fe6', color:'white', borderRadius:8, cursor:'pointer' };
const btnSecondary = { padding:'8px 10px', background:'#283061', border:'1px solid #33407d', color:'#e7eaf6', borderRadius:8, cursor:'pointer' };
const btnDanger = { padding:'8px 10px', background:'#5a2134', border:'1px solid #7a2c45', color:'#ffd1d9', borderRadius:8, cursor:'pointer' };
