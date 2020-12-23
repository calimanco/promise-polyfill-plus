import { State } from '../types'
import { PENDING } from '../helpers/constant'
import { runOnce } from '../helpers/util'

import processPromise from './processPromise'
import then from './then'
import resolve from './resolve'
import reject from './reject'
import { defaultOnFulfilledCallback } from './other'

interface ExecutorFn {
  (resolve: (value: any) => void, reject: (reason: any) => void): void
}

interface FulfilledCallback {
  (value: any): void
}

interface RejectedCallback {
  (reason: any): void
}

export default class MyPromise {
  _state: State = PENDING
  _value: any = null
  _reason: any = null
  _onFulfilledCallbacks: FulfilledCallback[] = []
  _onRejectedCallbacks: RejectedCallback[] = []
  _next: null | MyPromise = null
  _isCatch: boolean = false

  constructor(executor: ExecutorFn) {
    try {
      executor(this._resolve, this._reject)
    } catch (err) {
      this._reject(err)
    }
  }

  _resolve = resolve.bind(this)

  _reject = reject.bind(this)

  _processPromise = processPromise.bind(this)

  _defaultOnFulfilledCallback = runOnce(defaultOnFulfilledCallback.bind(this))

  then = then.bind(this)

  catch = (onRejected?: ((reason: any) => any) | null) => {
    return this.then(null, onRejected)
  }

  finally = (callback: Function) => {
    return this.then(
      (value: any) => {
        callback()
        return value
      },
      (reason: any) => {
        callback()
        throw reason
      }
    )
  }
}
