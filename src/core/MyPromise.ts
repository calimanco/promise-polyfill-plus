import { State } from '../types'
import { PENDING } from '../helpers/constant'
import { runOnce } from '../helpers/util'

import processPromise from './processPromise'
import then from './then'
import resolve from './resolve'
import reject from './reject'
import { defaultOnFulfilledCallback } from './other'

type ExecutorFn = (
  resolve: (value: any) => void,
  reject: (reason: any) => void
) => void

type FulfilledCallback = (value: any) => void

type RejectedCallback = (reason: any) => void

export default class MyPromise {
  _state: State = PENDING
  _value: any = null
  _reason: any = null
  _onFulfilledCallbacks: FulfilledCallback[] = []
  _onRejectedCallbacks: RejectedCallback[] = []
  _next: null | MyPromise = null
  _isCatch = false

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

  catch = (onRejected?: ((reason: any) => any) | null): MyPromise => {
    return this.then(null, onRejected)
  }

  finally = (callback: () => void): MyPromise => {
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
