import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { voteAnecdote, initAnecdotes } from '../actionCreator'

const sortByVotes = (a, b) => b.votes - a.votes

const AncedoteList = props => {
  const { anecdotes } = props
  const fetchAnecdotes = () => {
    props.initAnecdotes()
  }
  const vote = anecdote => {
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    props.voteAnecdote(voted)
  }
  /** Hooks */
  useEffect(fetchAnecdotes, [])
  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

const mapState = state => {
  const anecdotes =
    state.filter === ''
      ? state.anecdotes.sort(sortByVotes)
      : state.anecdotes
          .filter(a => a.content.includes(state.filter))
          .sort(sortByVotes)
  return { anecdotes }
}

const mapDispatch = {
  initAnecdotes,
  voteAnecdote,
}

export default connect(mapState, mapDispatch)(AncedoteList)
