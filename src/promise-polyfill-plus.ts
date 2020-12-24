import { MyPromiseStatic } from './types'
import { isPromiseLike } from './helpers/util'
import MyPromise from './core/MyPromise'
import initAll from './lib/all'
import initRace from './lib/race'
import initResolve from './lib/resolve'
import initReject from './lib/reject'

const staticMethods = {
  all: initAll,
  race: initRace,
  resolve: initResolve,
  reject: initReject
}

/**
 * 给 Promise 类添加静态方法
 * @param promiseClass
 */
export function initPromise(promiseClass: PromiseConstructorLike) {
  try {
    const instance = new promiseClass(() => {
      // do nothing
    })
    if (!isPromiseLike(instance)) {
      throw new TypeError(
        `Init param ${promiseClass} is not a PromiseConstructorLike object`
      )
    }
  } catch (err) {
    throw err
  }
  Object.keys(staticMethods).forEach(key => {
    if (typeof (promiseClass as any)[key] !== 'function') {
      ;(promiseClass as any)[key] = (staticMethods as any)[key](promiseClass)
    }
  })
  return promiseClass as MyPromiseStatic
}

const Promise = initPromise(MyPromise)

export default Promise
