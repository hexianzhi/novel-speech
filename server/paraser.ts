import cheerio from 'cheerio'

function parseSearchResult (html: string) {
  const $ = cheerio.load(html)
  const books = [] as Noval.ISearchResp[]

  $('.grid tr').each((index, trEle) => {
    if (!index) return
    const tds = $(trEle).find('td')
    const bookItem = {} as any
  
    $(tds).each((tdIndex, tdEle) => {
      if (tdIndex === 0) {
        const aTag = $(tdEle).find('a')
        bookItem.name = aTag.text()
        bookItem.nameLink = aTag.attr('href')
      }

      if (tdIndex === 1) {
        const aTag = $(tdEle).find('a')
        bookItem.newestChapter = aTag.text()
        bookItem.newestChapterLink = aTag.attr('href')
      }

      if (tdIndex === 2) {
        bookItem.author = $(tdEle).text()
      }

      if (tdIndex === 3) {
        bookItem.lastUpdate = $(tdEle).text()
      }
    })
   
    books.push(bookItem)
  })
  return books
}

const updateTimeReg =  /(最后更新(.+|\s+))/

function parseBookInfo (html: string) {
  const $ = cheerio.load(html)
  console.log('html: ', html);

  // TODO 自动解析获取字段。 正则思路指导： /最新章节.{0, 20}/
  const imgSrc = $('#fmimg').find('img').attr('src');
  const mainInfoText = $('#maininfo').text()
  let regArray = updateTimeReg.exec(mainInfoText)
  let lastUpdateTime
  if (regArray) lastUpdateTime = regArray[1]
  if (lastUpdateTime) lastUpdateTime  = lastUpdateTime.trim()
  
  const chapterList: any[] = []
  $('.box_con #list dd').each((index, ddItem) =>{
    const link = $(ddItem).find('a').attr('href')
    const chapterName = $(ddItem).find('a').text()
    chapterList.push({
      link,
      chapterName
    })
  })
  console.log('chapterList: ', chapterList);
  console.log('imgSrc: ', imgSrc);
  console.log('lastUpdateTime: ', lastUpdateTime);
  // return {
  //   imgSrc,
  //   lastUpdateTime
  // }
}


function parseBookDetail (html: string) {
  const $ = cheerio.load(html)
  const books = [] as Noval.ISearchResp[]

  $('.grid tr').each((index, trEle) => {
    if (!index) return
    const tds = $(trEle).find('td')
    const bookItem = {} as any
  
    $(tds).each((tdIndex, tdEle) => {
      if (tdIndex === 0) {
        const aTag = $(tdEle).find('a')
        bookItem.name = aTag.text()
        bookItem.nameLink = aTag.attr('href')
      }

      if (tdIndex === 1) {
        const aTag = $(tdEle).find('a')
        bookItem.newestChapter = aTag.text()
        bookItem.newestChapterLink = aTag.attr('href')
      }

      if (tdIndex === 2) {
        bookItem.author = $(tdEle).text()
      }

      if (tdIndex === 3) {
        bookItem.lastUpdate = $(tdEle).text()
      }
    })
   
    books.push(bookItem)
  })
  return books
}


export {
  parseSearchResult,
  parseBookInfo,
  parseBookDetail
}