import anecdoteService from './services/anecdote'

export const notifyUser = message => ({
  type: 'NOTIFY_USER',
  data: message,
})

export const voteAnecdote = payload => {
  const { id, votes } = payload
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id, { votes })
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: votedAnecdote,
    })
    const message = `You voted ${payload.content}`
    dispatch(setNotification(message, 5))
  }
}

export const setFilter = filter => ({
  type: 'SET_FILTER',
  data: filter,
})

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addAnecdote = anecdote => {
  return async dispatch => {
    const savedAnecdote = await anecdoteService.addAnecdote(anecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: savedAnecdote,
    })
  }
}

export const setNotification = (message, timeout) => {
  return (dispatch, getState) => {
    const { notifications: prevNotifications } = getState()
    const newNotifications = prevNotifications.concat(message)
    const notificationAction = {
      type: 'SET_NOTIFICATION',
      data: newNotifications,
    }
    dispatch(notificationAction)
    setTimeout(() => {
      const state = getState()
      dispatch({
        ...notificationAction,
        data: state.notifications.slice(1),
      })
    }, timeout * 1000)
  }
}
