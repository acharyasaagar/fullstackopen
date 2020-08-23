import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => axios.get(baseUrl)

export default { getAll }
