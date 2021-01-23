import MyPromise from './MyPromise'
import { checkEnv } from '../helpers/util'

export function defaultOnFulfilledCallback(this: MyPromise, reason: any): void {
  setTimeout(() => {
    if (!this._isCatch) {
      switch (checkEnv()) {
        case 'browser':
          console.error('Uncaught (in promise)', reason)
          break
        case 'node':
          console.log(
            `(node:12296) UnhandledPromiseRejectionWarning: ${JSON.stringify(
              reason
            )}`
          )
          break
      }
    }
  })
}
