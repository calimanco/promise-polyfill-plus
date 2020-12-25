export function race(MyPromise: any, promises: PromiseLike<any>[]) {
  return new MyPromise((resolve: (arg0: any) => void, reject: any) => {
    promises.forEach(promise => {
      promise.then((value: any) => {
        resolve(value)
      }, reject)
    })
  })
}

export default function initRace(MyPromise: any) {
  return race.bind(null, MyPromise)
}
