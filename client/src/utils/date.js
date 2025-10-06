export const isOverdue = (deadline) => {
  if (!deadline) return false
  const d = new Date(deadline)
  const now = new Date()
  return d.setHours(23,59,59,999) < now.getTime()
}

export const formatInputDate = (value) => {
  if (!value) return ''
  const d = new Date(value)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
