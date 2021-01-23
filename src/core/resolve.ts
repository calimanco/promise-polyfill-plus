import MyPromise from './MyPromise'
import { PENDING, FULFILLED } from '../helpers/constant'
import { isPromiseLike } from '../helpers/util'

export default function resolve(this: MyPromise, value: any): void {
  if (this._state === PENDING) {
    if (isPromiseLike(value)) {
      //  防止多次调用 then 方法。
      let called = false
      // eslint-disable-next-line no-useless-call
      value.then.call(
        value,
        (y: any) => {
          if (called) return
          called = true
          // 递归检查是否是非 thenable 类型的值，防止非标准实现的影响。
          this._resolve(y)
        },
        (reason: any) => {
          if (called) return
          called = true
          this._reject(reason)
        }
      )
    } else {
      this._state = FULFILLED
      this._value = value
      this._onFulfilledCallbacks.forEach(fulfilledCallback => {
        fulfilledCallback(this._value)
      })
    }
  } else {
    // do nothing
  }
}
