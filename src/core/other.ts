import MyPromise from './MyPromise'

export function defaultOnFulfilledCallback(this: MyPromise, reason: any): void {
  setTimeout(() => {
    if (!this._isCatch) {
      console.error('Uncaught (in promise)', reason)
    }
  })
}
