import React from 'react'

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  const prev = () => onChange(Math.max(1, page - 1))
  const next = () => onChange(Math.min(pages, page + 1))

  return (
    <div className="pagination">
      <button className="btn" onClick={prev} disabled={page === 1}>Prev</button>
      <span>Page {page} of {pages}</span>
      <button className="btn" onClick={next} disabled={page === pages}>Next</button>
    </div>
  )
}
