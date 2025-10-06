import React, { useEffect, useState } from 'react'
import api from '../api/axios.js'
import Loader from './Loader.jsx'
import TaskForm from './TaskForm.jsx'
import TaskItem from './TaskItem.jsx'
import FilterBar from './FilterBar.jsx'
import Pagination from './Pagination.jsx'

export default function TaskList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)

  const [filters, setFilters] = useState({ status: 'all', priority: 'all', q: '', page: 1 })

  const fetchData = async () => {
    setLoading(true)
    const params = { 
      page: filters.page, 
      limit: 6,
      status: filters.status !== 'all' ? filters.status : undefined,
      priority: filters.priority !== 'all' ? filters.priority : undefined,
      q: filters.q || undefined
    }
    const { data } = await api.get('/tasks', { params })
    setItems(data.results)
    setPage(data.page)
    setPages(data.totalPages)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [filters])

  const createTask = async (task) => {
    await api.post('/tasks', task)
    setCreating(false)
    await fetchData()
  }
  const updateTask = async (id, updates) => {
    await api.put(`/tasks/${id}`, updates)
    await fetchData()
  }
  const deleteTask = async (id) => {
    if (!confirm('Delete this task?')) return
    await api.delete(`/tasks/${id}`)
    await fetchData()
  }

  return (
    <>
      <FilterBar filters={filters} setFilters={setFilters} />
      <div className="actions">
        {!creating ? (
          <button className="btn primary" onClick={() => setCreating(true)}>+ New Task</button>
        ) : (
          <button className="btn" onClick={() => setCreating(false)}>Close</button>
        )}
      </div>
      {creating && (
        <div className="card">
          <TaskForm onSave={createTask} onCancel={() => setCreating(false)} />
        </div>
      )}
      {loading ? <Loader /> : (
        <>
          <div className="grid">
            {items.map(t => (
              <TaskItem key={t._id} task={t} onUpdate={updateTask} onDelete={deleteTask} />
            ))}
          </div>
          <Pagination page={page} pages={pages} onChange={(p) => setFilters(prev => ({ ...prev, page: p }))} />
        </>
      )}
    </>
  )
}
