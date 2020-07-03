import React from 'react'

const Search = props => {
  const { handleSearchTermChange, searchTerm } = props
  return (
    <form>
      <label>Find countries:&nbsp;&nbsp;</label>
      <input value={searchTerm} onChange={handleSearchTermChange} />
    </form>
  )
}

export default Search
