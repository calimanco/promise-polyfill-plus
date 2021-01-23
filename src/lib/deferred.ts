export function deferred(MyPromise: any): any {
  const tmp: any = {}
  const dfd = new MyPromise((resolve: any, reject: any) => {
    tmp.resolve = resolve
    tmp.reject = reject
  })
  dfd.resolve = tmp.resolve
  dfd.reject = tmp.reject
  return dfd
}

export default function initDeferred(MyPromise: any): () => any {
  return deferred.bind(null, MyPromise)
}
