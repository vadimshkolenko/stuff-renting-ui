import axios from 'axios'

import { token } from '../static'

export default axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { Authorization: `Bearer ${localStorage.getItem(token)}` },
})
