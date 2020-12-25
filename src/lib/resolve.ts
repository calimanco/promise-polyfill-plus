export function resolve(MyPromise: any, value?: any) {
  return new MyPromise((resolve: (arg0: any) => void) => {
    resolve(value)
  })
}

export default function initResolve(MyPromise: any) {
  return resolve.bind(null, MyPromise)
}
