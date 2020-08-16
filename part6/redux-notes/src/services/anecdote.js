import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => (await axios.get(baseUrl)).data

const addAnecdote = async anecdote => (await axios.post(baseUrl, anecdote)).data

const voteAnecdote = async (id, payload) => {
  return (await axios.patch(`${baseUrl}/${id}`, payload)).data
}

export default { addAnecdote, getAll, voteAnecdote }
