import axios from 'axios'

const baseUrl = 'http://localhost:8080/persons'

const parseResponse = res => res.data

const getAll = () => axios.get(baseUrl).then(parseResponse)

const create = payload => axios.post(baseUrl, payload).then(parseResponse)

const remove = identifier =>
  axios.delete(`${baseUrl}/${identifier}`).then(parseResponse)

const update = (identifier, payload) =>
  axios.put(`${baseUrl}/${identifier}`, payload).then(parseResponse)

export default { create, getAll, remove, update }
