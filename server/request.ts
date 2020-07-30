import URI from 'urijs'
import { OutgoingHttpHeaders, IncomingHttpHeaders } from 'http'
import axios from 'axios'

let axiosInstance = createRequest()

function createRequest () {
    const defaultTimeout = 10000

    const http = axios.create({
      timeout: defaultTimeout,
      method: 'post'
    })
    http.interceptors.request.use(config => {
      let proxyURL
      const headers = config.headers
      const customHeaders  = {} as IncomingHttpHeaders
      for (let key in headers) {
        if (!/common|delete|get|head|post|put|patch/.test(key)) {
          customHeaders[key] = headers[key]
        }
      }
      console.info({
        url: config.url,
        headers: customHeaders,
        proxy: proxyURL
      })
      return config
    })
    http.interceptors.response.use(rsp => rsp.data, error => Promise.reject(error))
    return http
}

/**
 * 抓取网页
 * @param url
 * @param clientHeaders
 */
async function requestDocument (url: string, ctx) {
  const {headers, query} = ctx
 
  // header
  // @ts-ignore
  const uri = new URI(url)
  const host = uri.host()
  const origin = uri.origin()
  const axiosHeaders = {
    'host': host,
    'origin': origin,
    'referer': origin
  } as OutgoingHttpHeaders

  Object.assign(headers, axiosHeaders)
  // const acceptLanguage = clientHeaders['Accept-Language']
  // headers['accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9  '
  // headers['accept-language'] = acceptLanguage || 'zh-CN,zh;q=0.9'
  // if (clientHeaders['user-Agent']) {
  //   headers['user-agent'] = clientHeaders['user-Agent']
  // } else {
  //   headers['user-agent'] = UA
  // }
  const timeout = 10000
  const options = {url, headers, timeout: timeout}
 
  const html = await axiosInstance(options)
  return html
}

export default {
  axiosInstance,
  createRequest,
  requestDocument
}
