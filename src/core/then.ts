import MyPromise from './MyPromise'
import { PENDING, FULFILLED, REJECTED } from '../helpers/constant'
import { simulateAsync, isFunction } from '../helpers/util'

export default function then(
  this: MyPromise,
  onFulfilled?: ((value: any) => any) | null,
  onRejected?: ((reason: any) => any) | null
) {
  if (!isFunction(onFulfilled)) {
    onFulfilled = value => {
      return value
    }
  }
  if (!isFunction(onRejected)) {
    onRejected = reason => {
      throw reason
    }
  }

  const invokeCallback = (
    callback: (value: any) => any,
    query: any,
    newResolve: (value: any) => void,
    newReject: (reason: any) => void
  ) => {
    simulateAsync(() => {
      try {
        const callbackResult = callback(query)
        this._processPromise(newPromise, callbackResult, newResolve, newReject)
      } catch (reason) {
        newReject(reason)
      }
    })
  }

  const newPromise = new MyPromise((newResolve, newReject) => {
    if (this._state === PENDING) {
      // 还处于挂起状态，将函数保存进队列。
      this._onFulfilledCallbacks.push(() => {
        invokeCallback(onFulfilled!, this._value, newResolve, newReject)
      })
      this._onRejectedCallbacks.push(() => {
        this._isCatch = true
        invokeCallback(onRejected!, this._reason, newResolve, newReject)
      })
    }

    if (this._state === FULFILLED) {
      // 已完成状态，直接执行 resolve 回调。
      invokeCallback(onFulfilled!, this._value, newResolve, newReject)
    }

    if (this._state === REJECTED) {
      this._isCatch = true
      // 报错状态，直接执行 reject 回调。
      invokeCallback(onRejected!, this._reason, newResolve, newReject)
    }
  })

  this._next = newPromise
  return newPromise
}
