export type State = 'pending' | 'fulfilled' | 'rejected'

export type Resolve<T> = (value?: T | PromiseLike<T>) => void

export type Reject = (reason?: any) => void

export type ExecutorFn<T> = (resolve: Resolve<T>, reject: Reject) => void

export interface MyPromiseInstance<T> {
  then: <TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ) => MyPromiseInstance<TResult1 | TResult2>
  catch: <TResult = never>(
    onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
  ) => MyPromiseInstance<T | TResult>
  finally: (onFinally?: (() => void) | null) => MyPromiseInstance<T>
}

export type MyPromiseClassStatic = new <T>(
  executor: ExecutorFn<T>
) => MyPromiseInstance<T>

interface DeferredMyPromiseInstance<T> extends MyPromiseInstance<T> {
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export interface MyPromiseStatic extends MyPromiseClassStatic {
  all: <T>(promiseArray: Iterable<T | PromiseLike<T>>) => MyPromiseInstance<T[]>
  race: <T>(promiseArray: Iterable<T | PromiseLike<T>>) => MyPromiseInstance<T>
  resolve: (() => Promise<void>) &
    (<T>(value?: T | PromiseLike<T>) => MyPromiseInstance<T>)
  reject: <T = never>(reason?: any) => MyPromiseInstance<T>
  deferred: <T>() => DeferredMyPromiseInstance<T>
  allSettled: <T>(
    promiseArray: Iterable<T | PromiseLike<T>>
  ) => MyPromiseInstance<T[]>
  try: <T>(fn: () => PromiseLike<T>) => MyPromiseInstance<T[]>
  any: <T>(promiseArray: Iterable<T | PromiseLike<T>>) => MyPromiseInstance<T>
}
