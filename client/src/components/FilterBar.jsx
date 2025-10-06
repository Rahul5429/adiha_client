import React, { useState, useEffect } from 'react'

export default function FilterBar({ filters, setFilters }) {
  const [local, setLocal] = useState(filters)

  useEffect(() => setLocal(filters), [filters])

  const apply = () => setFilters(local)
  const reset = () => setFilters({ status: 'all', q: '', priority: 'all', page: 1 })

  return (
    <div className="filterbar card">
      <div className="row">
        <label>Status
          <select value={local.status} onChange={e => setLocal({ ...local, status: e.target.value, page: 1 })}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        <label>Priority
          <select value={local.priority} onChange={e => setLocal({ ...local, priority: e.target.value, page: 1 })}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label className="grow">Search
          <input placeholder="Search by title…" value={local.q} onChange={e => setLocal({ ...local, q: e.target.value, page: 1 })}/>
        </label>
        <button className="btn" onClick={reset}>Reset</button>
        <button className="btn primary" onClick={apply}>Apply</button>
      </div>
    </div>
  )
}
