import axios from 'axios'

const baseUrl = '/api/blogs'

const token = () => JSON.parse(window.localStorage.loggedUser).token

const bearerToken = () => `bearer ${token()}`

const config = () => ({
  headers: {
    Authorization: bearerToken(),
  },
})

const getAll = async () => axios.get(baseUrl)

const create = async payload => axios.post(baseUrl, payload, config())

const remove = async blogId => axios.delete(`${baseUrl}/${blogId}`, config())

const update = async (payload, id) =>
  axios.put(`${baseUrl}/${id}`, payload, config())

export default { create, remove, getAll, update }
