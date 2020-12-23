import MyPromise from './MyPromise'
import { isPromiseLike, isMyPromise } from '../helpers/util'

export default function processPromise(
  newPromise: MyPromise,
  callbackResult: any,
  newResolve: (value: any) => void,
  newReject: (reason: any) => void
) {
  // called 防止多次调用
  let called = false

  if (newPromise === callbackResult) {
    // callbackResult 与 then 返回值相同，即是循环引用。
    return newReject(new TypeError('Chaining cycle detected for promise'))
  }
  if (isPromiseLike(callbackResult)) {
    // 判断返回的是类 Promise 对象（thenable），不需要去考虑其内部是如何实现，只需要从它的 then 方法可取得运行结果。
    if (isMyPromise(callbackResult)) {
      // 检查是否是在等待一个 promise 链后面的 promise，这是永远不可能完成的情况。
      let next = newPromise._next

      while (next) {
        if (callbackResult === next) {
          return newReject(new TypeError('Wait for never run promise'))
        }
        next = next._next
      }
    }
    try {
      let then = callbackResult.then
      // 这里可能是另一个异步，回调不会立即被执行，理论上如果一直有 thenable 对象嵌套，则会一直等待下去。
      then.call(
        callbackResult,
        (y: any) => {
          // 别人的 Promise 的 then 方法可能设置了 getter 等，使用 called 防止多次调用 then 方法。
          if (called) {
            return
          }
          called = true
          // 成功值 y 有可能还是 thenable 对象，再次 processPromise，直到成功值为非 thenable 对象。
          processPromise(newPromise, y, newResolve, newReject)
        },
        (reason: any) => {
          if (called) {
            return
          }
          called = true
          newReject(reason)
        }
      )
    } catch (reason) {
      // if (called) {
      //   return
      // }
      // called = true
      newReject(reason)
    }
  } else {
    // callbackResult 是普通值，直接resolve
    newResolve(callbackResult !== undefined ? callbackResult : null)
  }
}
