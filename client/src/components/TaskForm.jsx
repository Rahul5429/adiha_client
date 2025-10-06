import React, { useState } from 'react'
import { formatInputDate } from '../utils/date.js'

export default function TaskForm({ initial, onSave, onCancel }) {
  const [task, setTask] = useState(initial || {
    title: '', description: '', deadline: '', status: 'incomplete', priority: 'medium'
  })
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!task.title?.trim() || !task.description?.trim()) {
      setError('Title and description are required')
      return
    }
    await onSave(task)
  }

  return (
    <form className="form grid2" onSubmit={submit}>
      <label>Title
        <input value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} required />
      </label>
      <label>Deadline
        <input type="date"
          value={formatInputDate(task.deadline)}
          onChange={e => setTask({ ...task, deadline: e.target.value })}
        />
      </label>
      <label className="colspan2">Description
        <textarea rows="3" value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} required />
      </label>
      <label>Status
        <select value={task.status} onChange={e => setTask({ ...task, status: e.target.value })}>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <label>Priority
        <select value={task.priority} onChange={e => setTask({ ...task, priority: e.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      {error && <div className="error colspan2">{error}</div>}
      <div className="actions colspan2">
        <button className="btn primary" type="submit">Save</button>
        <button className="btn" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
