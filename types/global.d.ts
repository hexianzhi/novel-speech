declare module 'koa-router'
declare module 'koa'
declare module '@koa/cors'
declare module 'http'
 

declare namespace Noval {
  interface ISearchResp {
    /** 书名 */
    name: string
    /** 书名链接 */
    nameLink: string
    /** 最新章节 */
    newestChapter: string
    /** 最新章节 链接 */
    newestChapterLink: string
    /** 作者 */
    author: string
    /** 最后更新时间 */
    lastUpdate: string
  }
}
   