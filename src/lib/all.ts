export function all(MyPromise: any, promises: PromiseLike<any>[]) {
  return new MyPromise(
    (resolve: (value: any[]) => void, reject: (reason: any) => void) => {
      let result: any[] = []

      promises.forEach((promise, index) => {
        promise.then((value: any) => {
          result[index] = value

          if (result.length === promises.length) {
            resolve(result)
          }
        }, reject)
      })
    }
  )
}

export default function initAll(MyPromise: any) {
  return (promises: PromiseLike<any>[]) => {
    return all(MyPromise, promises)
  }
}
