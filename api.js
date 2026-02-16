
const base = import.meta.env.VITE_API_BASE_URL || '/api';

async function http(path, options={}) {
  const res = await fetch(base + path, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (!res.ok) {
    let msg = 'Request failed';
    try { const data = await res.json(); msg = data.error || JSON.stringify(data); } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const getTasks = () => http('/tasks');
export const createTask = (payload) => http('/tasks', { method: 'POST', body: JSON.stringify(payload) });
export const updateTask = (id, payload) => http(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTask = (id) => http(`/tasks/${id}`, { method: 'DELETE' });
