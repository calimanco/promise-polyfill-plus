export function resolve(MyPromise: any, value?: any): any {
  return new MyPromise((resolve: (arg0: any) => void) => {
    resolve(value)
  })
}

export default function initResolve(MyPromise: any): (value?: any) => any {
  return resolve.bind(null, MyPromise)
}
