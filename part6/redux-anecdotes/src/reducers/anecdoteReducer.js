const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_ANECDOTE':
      console.log('Actiondata is', action.data)
      return state.concat(action.data)
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      if (id) {
        const updatedState = state.map(anecdote => {
          return anecdote.id === id ? action.data : anecdote
        })
        return updatedState
      }
      return state
    default:
      return state
  }
}

export default anecdoteReducer
