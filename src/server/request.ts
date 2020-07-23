import * as URI from 'urijs'
import { OutgoingHttpHeaders, IncomingHttpHeaders } from 'http'
import axios, { AxiosRequestConfig } from 'axios'

let axiosInstance = createRequest()

function createRequest () {
    const defaultTimeout = 10000

    const http = axios.create({
      timeout: defaultTimeout
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
async function requestDocument (url: string, clientHeaders: IncomingHttpHeaders) {
  const timeout = 10000

  // header
  // @ts-ignore
  const uri = new URI(url)
  const host = uri.host()
  const origin = uri.origin()
  const headers = {
    'host': host,
    'origin': origin,
    'referer': origin
  } as OutgoingHttpHeaders
  const acceptLanguage = clientHeaders['accept-la nguage']
  headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9  '
  headers['accept-language'] = acceptLanguage || 'zh-CN,zh;q=0.9'
  const xForwardedFor = clientHeaders['x-forwarded-for']
  if (xForwardedFor) {
    headers['x-forwarded-for'] = xForwardedFor
  }
  
  headers['user-agent'] =  clientHeaders['user-agent']

  const options = {url: url, headers: headers, timeout: timeout}

  const html = await axiosInstance(options)
  return html
}

export default {
  axiosInstance,
  createRequest,
  requestDocument
}
