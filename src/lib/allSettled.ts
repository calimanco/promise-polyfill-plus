import { getArrayRealLen } from '../helpers/util'

export function allSettled(MyPromise: any, promises: PromiseLike<any>[]) {
  return new MyPromise((resolve: (arg0: any[]) => void) => {
    let result: any[] = []
    let promisesLen = promises.length

    promises.forEach((promise, index) => {
      promise.then(
        (value: any) => {
          result[index] = {
            status: 'fulfilled',
            value: value,
            reason: null
          }

          if (getArrayRealLen(result) === promisesLen) {
            resolve(result)
          }
        },
        reason => {
          result[index] = {
            status: 'rejected',
            value: null,
            reason: reason
          }

          if (getArrayRealLen(result) === promisesLen) {
            resolve(result)
          }
        }
      )
    })
  })
}

export default function initAllSettled(MyPromise: any) {
  return allSettled.bind(null, MyPromise)
}
