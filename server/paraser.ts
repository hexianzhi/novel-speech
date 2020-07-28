import cheerio from 'cheerio'

function parseHTML (html: string) {
  // console.log('-----html----> ', html)
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
  // books
  console.log('-----books----> ', books)
  return books
  // console.log('-----table----> ', table)
}

export default parseHTML