export function reject(MyPromise: any, reason: any) {
  return new MyPromise((resolve: any, reject: (arg0: any) => void) => {
    reject(reason)
  })
}

export default function initReject(MyPromise: any) {
  return (reason: any) => {
    return reject(MyPromise, reason)
  }
}
