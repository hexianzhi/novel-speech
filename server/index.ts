import Koa from 'koa'
import cors from '@koa/cors'
import router from './router'

const app = new Koa()

app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

start()

async function start() {
    const port = 3003
    await app.listen(port)
    const ip = getIPAddress()
    console.log('koa 已经成功运行!!预览网址:', `${ip}:${port}`)
}

function getIPAddress() {
  const interfaces = require('os').networkInterfaces()
  for (let devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}
