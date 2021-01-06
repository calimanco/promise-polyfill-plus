export function changeThenToInvokeTwice(promise: PromiseLike<any>) {
  const oldThen = promise.then
  promise.then = new Proxy(oldThen, {
    apply: function (target, ctx, args) {
      target(...args)
      target(...args)
    }
  })
  return promise
}

export function changeThenToThrowError(promise: PromiseLike<any>) {
  const oldThen = promise.then
  promise.then = new Proxy(oldThen, {
    apply: function () {
      const a: any = 1
      a.run()
    }
  })
  return promise
}
