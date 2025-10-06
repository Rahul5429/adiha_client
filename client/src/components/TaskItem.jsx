import React, { useState } from 'react'
import { isOverdue } from '../utils/date.js'
import TaskForm from './TaskForm.jsx'

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [edit, setEdit] = useState(false)

  const overdue = isOverdue(task.deadline) && task.status !== 'completed'

  const save = async (data) => {
    await onUpdate(task._id, data)
    setEdit(false)
  }

  if (edit) {
    return (
      <div className="card">
        <TaskForm initial={task} onSave={save} onCancel={() => setEdit(false)} />
      </div>
    )
  }

  return (
    <div className={`card task ${overdue ? 'overdue' : ''}`}>
      <div className="task-row">
        <div className="task-title">
          <strong>{task.title}</strong>
          {overdue && <span className="badge">Overdue</span>}
        </div>
        <div className={`chip ${task.priority}`}>{task.priority}</div>
      </div>
      <p className="muted">{task.description}</p>
      <div className="task-meta">
        <span>Status: <strong>{task.status}</strong></span>
        {task.deadline && <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>}
        <span>Updated: {new Date(task.updatedAt).toLocaleString()}</span>
      </div>
      <div className="actions">
        <button className="btn" onClick={() => setEdit(true)}>Edit</button>
        <button className="btn danger" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  )
}
