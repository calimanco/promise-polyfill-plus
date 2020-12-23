import { MyPromiseStatic } from './types'
import MyPromise from './core/MyPromise'
import initAll from './lib/all'
import initRace from './lib/race'
import initResolve from './lib/resolve'
import initReject from './lib/reject'

interface ExecutorFn {
  (resolve: (value: any) => void, reject: (reason: any) => void): void
}

class Tmp extends MyPromise {
  constructor(executor: ExecutorFn) {
    super(executor)
  }
  static all = initAll(MyPromise)
  static race = initRace(MyPromise)
  static resolve = initResolve(MyPromise)
  static reject = initReject(MyPromise)
}

export default (Tmp as unknown) as MyPromiseStatic
