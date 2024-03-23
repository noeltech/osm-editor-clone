const apiUrl = 'http://localhost:3000'
import axios from 'axios'

export default axios.create({
  baseURL: apiUrl
})
