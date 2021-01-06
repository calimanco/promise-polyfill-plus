import MyPromise from '../core/MyPromise'
const toString = Object.prototype.toString

/**
 * 判断是否是 PromiseLike 的对象。
 * @param val 需要判断的对象
 */
export function isPromiseLike(val: any): val is PromiseLike<any> {
  return (
    val !== null &&
    (toString.call(val) === '[object Promise]' ||
      toString.call(val) === '[object Object]' ||
      toString.call(val) === '[object Function]') &&
    typeof val.then === 'function'
  )
}

/**
 * 判断是否是 PromiseConstructorLike 的对象。
 * @param promiseClass
 */
export function isPromiseConstructorLike(
  promiseClass: any
): promiseClass is PromiseConstructorLike {
  try {
    const instance = new promiseClass(() => {
      // do nothing
    })
    if (!isPromiseLike(instance)) {
      return false
    }
  } catch (err) {
    return false
  }
  return true
}

/**
 * 判断是否是内置的 Promise 构造函数产生的 promise 对象。
 * @param val 需要判断的对象
 */
export function isMyPromise(val: any): val is MyPromise {
  return val !== null && val instanceof MyPromise
}

/**
 * 判断是不是函数。
 * @param val 需要判断的对象
 */
export function isFunction(val: any): val is (...arg: any) => any {
  return typeof val === 'function'
}

/**
 * 模拟异步延迟。
 * @param fn 延迟运行的函数
 * @param ms 延迟的毫秒数，默认是0
 */
export function simulateAsync(fn: (...arg: any) => any, ms = 0): void {
  setTimeout(fn, ms)
}

/**
 * 使函数只运行一次的包装函数。
 * @param fn 函数
 */
export function runOnce(fn: (...arg: any) => any) {
  let lock = false
  return (...arg: any) => {
    if (lock) return
    lock = true
    return fn(...arg)
  }
}

/**
 * 检查运行的环境。
 */
export function checkEnv() {
  if (typeof window !== 'undefined') {
    return 'browser'
  } else {
    return 'node'
  }
}

/**
 * 获取数组的真实长度。
 * @param arr 数组
 */
export function getArrayRealLen(arr: Array<any>) {
  return Object.keys(arr).length
}
