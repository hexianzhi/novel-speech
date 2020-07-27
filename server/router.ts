import Router from 'koa-router'
import Request from './request'
import {DomUtils, parseDOM} from 'htmlparser2'
import parseHTML from './paraser'
 
const router = new Router()

const testURl = 'http://www.xbiquge.la/modules/article/waps.php?'
const key = 'searchkey='
const value = '轮回'

router.get('/search', async (ctx: any) => {

  const url = testURl + key + encodeURIComponent(value)
  const result = await Request.requestDocument(url, ctx) as unknown as string
  // @ts-ignore unicode 编码解析成字符串
  const outerHTML = DomUtils.getOuterHTML(parseDOM(result))
  parseHTML(outerHTML)
  // console.log('-----result----> ', result)
  // console.log('-----outerHTML----> ', outerHTML)

  if (result) {
  //   ctx.body = {
  //     success: true,
  //     data: outerHTML
  //  } 
  ctx.body = outerHTML
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
