import axios from 'axios'
import authService from './auth'

const baseUrl = '/api/blogs'
const authToken = authService.getBearerTokenFromLocalStorage()

const config = {
  headers: {
    Authorization: authToken,
  },
}

const getAll = async () => axios.get(baseUrl)

const create = async payload => axios.post(baseUrl, payload, config)

const update = async (payload, id) =>
  axios.put(`${baseUrl}/${id}`, payload, config)

export default { create, getAll, update }
