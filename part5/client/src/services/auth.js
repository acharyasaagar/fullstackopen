import axios from 'axios'

const baseUrl = '/api/login'

const login = credentials => axios.post(baseUrl, credentials)

const getBearerTokenFromLocalStorage = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  if (user) return `bearer ${user.token}`
  return null
}

export default { getBearerTokenFromLocalStorage, login }
