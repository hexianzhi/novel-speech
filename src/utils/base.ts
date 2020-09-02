/**
 * 放置一些基础的工具函数
 */
/** 保存到sessionStorage */
class Storage {
  storage
  constructor (type: 'session' | 'local' = 'session') {
    this.storage = type === 'session' ? sessionStorage : localStorage
  }
  save (key, value) {
    value = typeof value === 'object' ? JSON.stringify(value) : value
    this.storage.setItem(key, value)
  }
  get (key) {
    let value = this.storage.getItem(key)
    try {
      value = value && JSON.parse(value)
      return value
    } catch {
      return value
    }
  }
  clear (key) {
    this.storage.removeItem(key)
  }
}

export const storage = new Storage()
export const storageLocal = new Storage('local')

/** ---------------- 通信 ------------------- */
export class EvtMsg {
  evts

  constructor () {
    this.evts = {}
  }

  on (event: string, cb) {
    if(!event || typeof cb !== 'function') return
    if(!this.evts[event]) {
      this.evts[event] = []
    }
    this.evts[event].push(cb)
  }

  emit (event, ...arg) {
    if (!event || !this.evts[event]) return
    const cbs = this.evts[event]
    for(let i=0; i<cbs.length; i++) {
      const cb = cbs[i]
      cb.apply(this, arg)
    }
  }

  off (event: string, cb) {
    if (!event || !this.evts[event]) return
    const cbs = this.evts[event]
    const idx = cbs.findIndex(c => c === cb)
    cbs.splice(idx, 1)
    return
  }

  removeAll () {
    this.evts = {}
  }
}

/** 防抖 */
export const debounce = (fn, delay = 500) => {
  let timerId
  return (...rest) => {
    const args = rest
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/** 生成唯一ID */
export function generateId (prefix) {
  return `${prefix ? prefix + '-' : ''}${new Date().getTime().toString(36).slice(2)}${Math.random().toString(36).slice(6)}`
}

/** 获取url连接的参数 */
export function getParamName (attr, search) {
  const match = RegExp(`[?&]${attr}=([^&]*)`) //分组运算符是为了把结果存到exec函数返回的结果里
    .exec(search)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ')) // url中+号表示空格,要替换掉
}
