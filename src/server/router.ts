import * as Router from 'koa-router'
 
const router = new Router()

router.get('/search', async (ctx: any) => {
  if (ctx.query.keyword) {
 
    ctx.body = {
      success: true,
      data: 'data'
    }
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
