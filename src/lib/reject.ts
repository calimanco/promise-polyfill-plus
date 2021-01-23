export function reject(MyPromise: any, reason: any): any {
  return new MyPromise((resolve: any, reject: (arg0: any) => void) => {
    reject(reason)
  })
}

export default function initReject(MyPromise: any): (reason: any) => any {
  return reject.bind(null, MyPromise)
}
