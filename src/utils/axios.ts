
import axios from 'axios'

const target = 'http://106.55.9.70:3000'
const local = 'http://localhost:3004'

let http = axios.create({
  baseURL: `${local}/`,
  timeout: 12000
  // responseType: 'json',
})
 

export default http
