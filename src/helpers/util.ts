import MyPromise from './../../src/core/MyPromise'
const toString = Object.prototype.toString
const env = this

export function isPromiseLike(val: any): val is PromiseLike<any> {
  return (
    val !== null &&
    (toString.call(val) === '[object Promise]' ||
      toString.call(val) === '[object Object]' ||
      toString.call(val) === '[object Function]') &&
    typeof val.then === 'function'
  )
}

export function isMyPromise(val: any): val is MyPromise {
  return val !== null && val instanceof MyPromise
}

export function isFunction(val: any): val is Function {
  return typeof val === 'function'
}

export function simulateAsync(fn: Function, ms = 0): void {
  setTimeout(fn, ms)
}

export function runOnce(fn: Function) {
  let lock = false
  return (...arg: any) => {
    if (lock) return
    lock = true
    return fn(...arg)
  }
}

export function checkEnv() {
  return env === window ? 'browser' : 'node'
}
