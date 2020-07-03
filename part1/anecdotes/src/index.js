import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]
const Button = ({ handleClick, title }) => (
  <button onClick={handleClick}>{title}</button>
)
const Break = () => (
  <>
    {' '}
    <hr /> <br />{' '}
  </>
)

const getRandom = (selected, max) => {
  let random = Math.floor(Math.random() * max)
  if (random === selected) {
    return getRandom(selected, max)
  }
  return random
}

const App = ({ anecdotes }) => {
  const anecdotesLength = anecdotes.length
  const initialVotes = new Array(anecdotesLength).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)
  const [highestVoted, setHighestVoted] = useState(0)

  const handleNext = () => setSelected(getRandom(selected, anecdotesLength))

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    setHighestVoted(indexOfHighestVoted(newVotes))
  }

  const indexOfHighestVoted = votes => votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Break />
      <p>{anecdotes[selected]}</p>
      <p>
        This anecdote is voted <b> {votes[selected]} </b> times.
      </p>
      <Button handleClick={handleVote} title="Vote" />
      <Button handleClick={handleNext} title="Next Anecdote" />
      <Break />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[highestVoted]}</p>
      <p>
        This anecdote is voted <b> {votes[highestVoted]} </b> times.
      </p>
      <Break />
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
