import { MyPromiseStatic } from './types'
import { isPromiseConstructorLike } from './helpers/util'
import MyPromise from './core/MyPromise'
import initAll from './lib/all'
import initRace from './lib/race'
import initResolve from './lib/resolve'
import initReject from './lib/reject'
import initDeferred from './lib/deferred'
import initAllSettled from './lib/allSettled'
import initTry from './lib/try'
import initAny from './lib/any'

const staticMethods = {
  all: initAll,
  race: initRace,
  resolve: initResolve,
  reject: initReject,
  deferred: initDeferred,
  allSettled: initAllSettled,
  try: initTry,
  any: initAny
}

/**
 * 给 Promise 类添加静态方法
 * @param promiseClass
 */
export function initPromise(promiseClass: PromiseConstructorLike) {
  if (!isPromiseConstructorLike(promiseClass)) {
    throw new TypeError(
      `Init param ${promiseClass} is not a PromiseConstructorLike object`
    )
  }
  Object.keys(staticMethods).forEach(key => {
    if (typeof (promiseClass as any)[key] !== 'function') {
      ;(promiseClass as any)[key] = (staticMethods as any)[key](promiseClass)
    }
  })
  return promiseClass as MyPromiseStatic
}

const Promise = initPromise(MyPromise)

/**
 * 自动 Polyfill 当前运行环境的 Promise
 */
export function autoPolyfill() {
  const env = typeof window !== 'undefined' ? window : global
  if (env.Promise && isPromiseConstructorLike(env.Promise)) {
    ;(env as any).Promise = initPromise(env.Promise)
  } else {
    ;(env as any).Promise = Promise
  }
}

export default Promise
