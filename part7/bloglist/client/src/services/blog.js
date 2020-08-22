import axios from 'axios'

const baseUrl = '/api/blogs'

const token = () => JSON.parse(window.localStorage.loggedUser).token

const bearerToken = () => `bearer ${token()}`

const config = () => ({
  headers: {
    Authorization: bearerToken(),
  },
})

const getAll = () => axios.get(baseUrl)

const create = payload => axios.post(baseUrl, payload, config())

const like = blog => axios.patch(`${baseUrl}/${blog.id}`, { likes: 'like' })

const remove = blog => axios.delete(`${baseUrl}/${blog.id}`, config())

const update = (payload, blog) =>
  axios.put(`${baseUrl}/${blog.id}`, payload, config())

export default { create, getAll, like, remove, update }
