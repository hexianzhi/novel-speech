"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _router = _interopRequireDefault(require("./router"));

const app = new _koa.default();
app.use((0, _cors.default)());
app.use(_router.default.routes()).use(_router.default.allowedMethods());
start();

async function start() {
  const port = 3000;
  await app.listen(port);
  const ip = getIPAddress();
  console.log('koa 已经成功运行!!预览网址:', `${ip}:${port}`);
}

function getIPAddress() {
  const interfaces = require('os').networkInterfaces();

  for (let devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}