import React from 'react'

const Filter = props => {
  const { filter, handleFilterChange } = props

  return (
    <>
      <form>
        <label className="text">Filter shown with:&nbsp;&nbsp;</label>
        <input value={filter} onChange={handleFilterChange} />
      </form>
    </>
  )
}

export default Filter
