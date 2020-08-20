import Router from 'koa-router'
import Request from './request'
import {DomUtils, parseDOM} from 'htmlparser2'
import {parseSearchResult, parseBookInfo, parseBookDetail} from './paraser'
 
const router = new Router()

const testURl = 'http://www.xbiquge.la/modules/article/waps.php?'
const key = 'searchkey='

router.get('/search', async (ctx: any) => {
  const {searchkey} = ctx.query
  console.log('searchkey: ', searchkey);
  
  const url = testURl + key + encodeURIComponent(searchkey)
  const resp = await Request.requestDocument(url, ctx) as unknown as string
 
  // @ts-ignore unicode 编码解析成字符串
  const outerHTML = DomUtils.getOuterHTML(parseDOM(resp))
  const result = parseSearchResult(outerHTML)

  if (result instanceof Object) {
    ctx.body = result
  } else {
    ctx.throw(400, '解析失败')
  }
})


router.get('/bookInfo', async (ctx: any) => {
  console.log('bookInfoctx.query.url: ', ctx.query.url);
  if (!ctx.query.url) ctx.throw(400, '找不到地址')
  
  console.log('-----开始请求!!')
  let time = Date.now()

  const resp = await Request.requestDocument(ctx.query.url, ctx) as unknown as string
  console.log('-----请求完成!!', Number((Date.now() - time) / 1000) , 's')

  // @ts-ignore unicode 编码解析成字符串
  const outerHTML = DomUtils.getOuterHTML(parseDOM(resp))
  const result = parseBookInfo(outerHTML)

  // @ts-ignore
  if (result instanceof Object) {
    ctx.body = result
  } else {
    ctx.throw(400, '解析失败')
  }
})

 

router.get('/bookDetail', async (ctx: any) => {
  console.log('bookDetail ctx.query.url: ', ctx.query.url);
  if (!ctx.query.url) ctx.throw(400, '找不到地址')

  const resp = await Request.requestDocument(ctx.query.url, ctx) as unknown as string
  // @ts-ignore unicode 编码解析成字符串
  const outerHTML = DomUtils.getOuterHTML(parseDOM(resp))
  const result = parseBookDetail(outerHTML)
  
  // @ts-ignore
  if (result instanceof Object) {
    ctx.body = result
  } else {
    ctx.throw(400, '解析失败')
  }
})



export default router
