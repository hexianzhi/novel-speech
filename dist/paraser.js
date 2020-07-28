"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cheerio = _interopRequireDefault(require("cheerio"));

function parseHTML(html) {
  // console.log('-----html----> ', html)
  const $ = _cheerio.default.load(html);

  const books = [];
  $('.grid tr').each((index, trEle) => {
    if (!index) return;
    const tds = $(trEle).find('td');
    const bookItem = {};
    $(tds).each((tdIndex, tdEle) => {
      if (tdIndex === 0) {
        const aTag = $(tdEle).find('a');
        bookItem.name = aTag.text();
        bookItem.nameLink = aTag.attr('href');
      }

      if (tdIndex === 1) {
        const aTag = $(tdEle).find('a');
        bookItem.newestChapter = aTag.text();
        bookItem.newestChapterLink = aTag.attr('href');
      }

      if (tdIndex === 2) {
        bookItem.author = $(tdEle).text();
      }

      if (tdIndex === 3) {
        bookItem.lastUpdate = $(tdEle).text();
      }
    });
    books.push(bookItem);
  }); // books

  console.log('-----books----> ', books);
  return books; // console.log('-----table----> ', table)
}

var _default = parseHTML;
exports.default = _default;