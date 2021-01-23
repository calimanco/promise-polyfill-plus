export function race(MyPromise: any, promises: Array<PromiseLike<any>>): any {
  return new MyPromise((resolve: (arg0: any) => void, reject: any) => {
    promises.forEach(promise => {
      promise.then((value: any) => {
        resolve(value)
      }, reject)
    })
  })
}

export default function initRace(
  MyPromise: any
): (promises: Array<PromiseLike<any>>) => any {
  return race.bind(null, MyPromise)
}
