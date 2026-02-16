
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (payload) => {
    const created = await createTask(payload);
    setTasks(prev => [created, ...prev]);
  };

  const handleUpdate = async (id, payload) => {
    const updated = await updateTask(id, payload);
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="grid">
      <section className="card">
        <h2 style={{marginTop:0}}>Create task</h2>
        <TaskForm onSubmit={handleCreate} />
      </section>
      <section className="card">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <h2 style={{marginTop:0}}>Tasks</h2>
          <button onClick={load} style={{padding:'8px 12px', background:'#283061', border:'1px solid #33407d', color:'#e7eaf6', borderRadius:8}}>↻ Refresh</button>
        </div>
        {loading ? (<p>Loading…</p>) : error ? (<p style={{color:'#ff9f9f'}}>{error}</p>) : (
          <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
        )}
      </section>
    </div>
  );
}
