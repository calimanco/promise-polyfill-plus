import MyPromise from './MyPromise'
import { PENDING, REJECTED } from '../helpers/constant'

export default function reject(this: MyPromise, reason: any) {
  if (this._state === PENDING) {
    this._state = REJECTED
    this._reason = reason

    this._onRejectedCallbacks.forEach(rejectedCallbacks => {
      rejectedCallbacks(this._reason)
    })

    this._defaultOnFulfilledCallback(this._reason)
  } else {
    // do nothing
  }
}
