/**
 * @jest-environment node
 */

import MyPromise from '../src'
import { checkEnv } from '../src/helpers/util'

/**
 * node 环境下的测试 checkEnv
 */
describe('checkEnv function test', () => {
  it('should not be browser', () => {
    expect(checkEnv()).not.toBe('browser')
  })
  it('should be node', () => {
    expect(checkEnv()).toBe('node')
  })
})

/**
 * node 环境下的测试错误抛出
 */
it('not with catch handle, should console a node "Uncaught Error" log', done => {
  const onFulfilled = jest.fn()
  const spy = jest.spyOn(console, 'log')
  new MyPromise((resolve: any, reject: (arg0: number) => void) => {
    setTimeout(() => {
      reject(123)
    })
  })
    .then(onFulfilled)
    .finally(() => {
      expect(onFulfilled).toHaveBeenCalledTimes(0)
      setTimeout(() => {
        expect(spy).toHaveBeenCalledWith(
          '(node:12296) UnhandledPromiseRejectionWarning: 123'
        )
        done()
      }, 10)
    })
})
