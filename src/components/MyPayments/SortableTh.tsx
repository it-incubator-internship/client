import React from 'react'

type SortableThProps = {
  field: string
  label: string
  setSort: React.Dispatch<React.SetStateAction<{ sortBy: string; sortDirection: string }>>
  sort: { sortBy: string; sortDirection: string }
}

export const SortableTh = ({ field, label, setSort, sort }: SortableThProps) => {
  const isActive = sort.sortBy === field
  const direction = isActive ? sort.sortDirection : null

  const handleClick = () => {
    if (isActive) {
      setSort(prev => ({
        ...prev,
        sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
      }))
    } else {
      setSort({
        sortBy: field,
        sortDirection: 'asc',
      })
    }
  }

  return (
    <th onClick={handleClick} style={{ cursor: 'pointer' }}>
      {label}
      {isActive && (direction === 'asc' ? ' ↑' : ' ↓')}
    </th>
  )
}
