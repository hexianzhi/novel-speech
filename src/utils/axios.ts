
import axios from 'axios'

const target = 'http://106.55.9.70:3004'
const local = 'http://localhost:3004'
const URL = process.env.NODE_ENV === 'production' ? target : local 

let http = axios.create({
  baseURL: `${URL}/`,
  timeout: 12000
  // responseType: 'json',
})
http.interceptors.response.use(rsp => rsp.data, error => Promise.reject(error))
 

export default http
