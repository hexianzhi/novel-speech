import Router from 'koa-router'
import Request from './request'
import {DomUtils, parseDOM} from 'htmlparser2'
import parseHTML from './paraser'
 
const router = new Router()

const testURl = 'http://www.xbiquge.la/modules/article/waps.php?'
const key = 'searchkey='

router.get('/search', async (ctx: any) => {
  const {searchkey} = ctx.query
  const url = testURl + key + encodeURIComponent(searchkey)

  const resp = await Request.requestDocument(url, ctx) as unknown as string
 
  // @ts-ignore unicode 编码解析成字符串
  const outerHTML = DomUtils.getOuterHTML(parseDOM(resp))
  const result = parseHTML(outerHTML)

  if (result) {
    ctx.body = result
  } else {
    ctx.throw(400, '请输入关键词')
  }
})

router.get('/content', async (ctx: any) => {
  if (ctx.query.keyword) {
 
  } else {
    ctx.throw(400, '请输入关键词')
  }
})



export default router
