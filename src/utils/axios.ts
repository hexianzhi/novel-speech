
import axios from 'axios'

const target = 'http://106.55.9.70:3000'
const local = 'http://localhost:3004'

let http = axios.create({
  baseURL: `${local}/`,
  timeout: 12000
  // responseType: 'json',
})
http.interceptors.response.use(rsp => rsp.data, error => Promise.reject(error))
 

export default http
