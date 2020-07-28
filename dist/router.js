"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _request = _interopRequireDefault(require("./request"));

var _htmlparser = require("htmlparser2");

var _paraser = _interopRequireDefault(require("./paraser"));

const router = new _koaRouter.default();
const testURl = 'http://www.xbiquge.la/modules/article/waps.php?';
const key = 'searchkey=';
const value = '轮回';
router.get('/search', async ctx => {
  const url = testURl + key + encodeURIComponent(value);
  const result = await _request.default.requestDocument(url, ctx); // @ts-ignore unicode 编码解析成字符串

  const outerHTML = _htmlparser.DomUtils.getOuterHTML((0, _htmlparser.parseDOM)(result));

  (0, _paraser.default)(outerHTML); // console.log('-----result----> ', result)
  // console.log('-----outerHTML----> ', outerHTML)

  if (result) {
    //   ctx.body = {
    //     success: true,
    //     data: outerHTML
    //  } 
    ctx.body = outerHTML;
  } else {
    ctx.throw(400, '请输入关键词');
  }
});
router.get('/content', async ctx => {
  if (ctx.query.keyword) {} else {
    ctx.throw(400, '请输入关键词');
  }
});
var _default = router;
exports.default = _default;