export function deferred(MyPromise: any) {
  const tmp: any = {}
  let dfd = new MyPromise((resolve: any, reject: any) => {
    tmp.resolve = resolve
    tmp.reject = reject
  })
  dfd.resolve = tmp.resolve
  dfd.reject = tmp.reject
  return dfd
}

export default function initDeferred(MyPromise: any) {
  return deferred.bind(null, MyPromise)
}
