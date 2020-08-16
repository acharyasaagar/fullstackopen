import React from 'react'
import { connect } from 'react-redux'

import { addAnecdote } from '../actionCreator'

const asObject = anecdote => {
  return {
    content: anecdote,
    votes: 0,
  }
}

const AnecdoteForm = props => {
  const createAnecdote = event => {
    event.preventDefault()
    const anecdote = asObject(event.target.anecdote.value)
    event.target.anecdote.value = ''
    props.addAnecdote(anecdote)
  }

  return (
    <>
      <h3>Create Anecdote</h3>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default connect(null, { addAnecdote })(AnecdoteForm)
