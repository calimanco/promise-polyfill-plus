import { getArrayRealLen } from '../helpers/util'

export function any(MyPromise: any, promises: PromiseLike<any>[]) {
  return new MyPromise(
    (resolve: (value: any) => void, reject: (reason: any[]) => void) => {
      const result: any[] = []
      const promisesLen = promises.length

      promises.forEach((promise, index) => {
        promise.then(resolve, (reason: any) => {
          result[index] = reason

          if (getArrayRealLen(result) === promisesLen) {
            reject(result)
          }
        })
      })
    }
  )
}

export default function initAny(MyPromise: any) {
  return any.bind(null, MyPromise)
}
