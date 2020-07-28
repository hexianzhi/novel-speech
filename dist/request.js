"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _urijs = _interopRequireDefault(require("urijs"));

var _axios = _interopRequireDefault(require("axios"));

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36';
let axiosInstance = createRequest();

function createRequest() {
  const defaultTimeout = 10000;

  const http = _axios.default.create({
    timeout: defaultTimeout,
    method: 'post'
  });

  http.interceptors.request.use(config => {
    let proxyURL;
    const headers = config.headers;
    const customHeaders = {};

    for (let key in headers) {
      if (!/common|delete|get|head|post|put|patch/.test(key)) {
        customHeaders[key] = headers[key];
      }
    }

    console.info({
      url: config.url,
      headers: customHeaders,
      proxy: proxyURL
    });
    return config;
  });
  http.interceptors.response.use(rsp => rsp.data, error => Promise.reject(error));
  return http;
}
/**
 * 抓取网页
 * @param url
 * @param clientHeaders
 */


async function requestDocument(url, ctx) {
  const {
    headers,
    query
  } = ctx; // header
  // @ts-ignore

  const uri = new _urijs.default(url);
  const host = uri.host();
  const origin = uri.origin();
  const axiosHeaders = {
    'host': host,
    'origin': origin,
    'referer': origin
  };
  Object.assign(headers, axiosHeaders); // const acceptLanguage = clientHeaders['Accept-Language']
  // headers['accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9  '
  // headers['accept-language'] = acceptLanguage || 'zh-CN,zh;q=0.9'
  // if (clientHeaders['user-Agent']) {
  //   headers['user-agent'] = clientHeaders['user-Agent']
  // } else {
  //   headers['user-agent'] = UA
  // }

  const timeout = 10000;
  const options = {
    url,
    headers,
    timeout: timeout
  };
  const html = await axiosInstance(options);
  return html;
}

var _default = {
  axiosInstance,
  createRequest,
  requestDocument
};
exports.default = _default;