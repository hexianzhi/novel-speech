const TestURL = 'http://www.xbiquge.la'
// 获取域名
const UrlReg= /(http:\/\/(\w+|\.)+)\//g

function isUrl (url) {
  return /^https?:\/\/.+/.test(url)
}

export default {
  TestURL, 
  UrlReg,
  isUrl
}