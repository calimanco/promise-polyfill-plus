/**
 * @jest-environment ./test/env/no-promise-environment
 */

import { autoPolyfill } from '../src'

describe('init function test in no promise env', () => {
  it('should be added method', done => {
    setTimeout(() => {
      autoPolyfill()
      const EnvPromise: any = Promise
      expect(EnvPromise.deferred).not.toBeUndefined()
      expect(EnvPromise.allSettled).not.toBeUndefined()
      expect(EnvPromise.any).not.toBeUndefined()
      expect(EnvPromise.try).not.toBeUndefined()
      done()
    })
  })
})
