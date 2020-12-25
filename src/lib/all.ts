import { getArrayRealLen } from '../helpers/util'

export function all(MyPromise: any, promises: PromiseLike<any>[]) {
  return new MyPromise(
    (resolve: (value: any[]) => void, reject: (reason: any) => void) => {
      let result: any[] = []
      let promisesLen = promises.length

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
