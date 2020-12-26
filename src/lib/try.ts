export function tryFn(MyPromise: any, fn: () => PromiseLike<any>) {
  return new MyPromise((resolve: (arg0: PromiseLike<any>) => void) => {
    resolve(fn())
  })
}

export default function initTry(MyPromise: any) {
  return tryFn.bind(null, MyPromise)
}
