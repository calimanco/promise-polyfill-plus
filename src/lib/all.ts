import { getArrayRealLen } from '../helpers/util'

export function all(MyPromise: any, promises: PromiseLike<any>[]) {
  return new MyPromise(
    (resolve: (value: any[]) => void, reject: (reason: any) => void) => {
      const result: any[] = []
      const promisesLen = promises.length

      promises.forEach((promise, index) => {
        promise.then((value: any) => {
          result[index] = value

          if (getArrayRealLen(result) === promisesLen) {
            resolve(result)
          }
        }, reject)
      })
    }
  )
}

export default function initAll(MyPromise: any) {
  return all.bind(null, MyPromise)
}
