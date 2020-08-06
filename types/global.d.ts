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

  interface IBookInfoNode {
    /** 最后更新时间 */
    lastUpdateTime: string
    /** 封面图 */
    imgSrc: string
    /** 章节列表 */
    chapterList: IChapterInfo[]
  }

  type IBookInfo = IBookInfoNode & ISearchResp

  interface IChapterInfo {
    /** 章节链接 */
    link: string
    /**  章节名字  */
    chapterName: string
  }

  interface IBookDetail {
    /** 内容 */
    content: string
    /** 章节名 */
    charpterName: string
    /** 上一章链接 */
    preChapterLink: string
    /** 章节目录链接 */
    chapterListLink: string
    /** 上一章链接 */
    nextChapterLink: string
  }
}
   