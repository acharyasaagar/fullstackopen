import React from 'react'
import { connect } from 'react-redux'

import { setFilter } from '../actionCreator'

const AnecdoteFilter = props => {
  const changeFilter = event => {
    props.setFilter(event.target.value)
  }
  return (
    <div style={{ marginTop: 22 }}>
      <label htmlFor="anecdote-filter">Filter Anecdotes: </label>
      <input name="anecdote-filter" onChange={changeFilter} />
    </div>
  )
}
export default connect(null, { setFilter })(AnecdoteFilter)
