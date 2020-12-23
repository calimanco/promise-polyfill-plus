import MyPromise from '../src'
import { changeThenToInvokeTwice } from './util'

/**
 * resolve 方法的基本测试。
 */
describe('MyPromise‘s resolve function base test', () => {
  it('resolve function called once, should be resolved with 123', done => {
    const onFulfilled = jest.fn()
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(123)
    })
      .then(onFulfilled)
      .finally(() => {
        expect(onFulfilled).toHaveBeenCalledTimes(1)
        expect(onFulfilled).toHaveBeenCalledWith(123)
        done()
      })
  })

  it('resolve function called twice, should be resolved with 345', done => {
    const onFulfilled = jest.fn()
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(345)
      resolve(678)
    })
      .then(onFulfilled)
      .finally(() => {
        expect(onFulfilled).toHaveBeenCalledTimes(1)
        expect(onFulfilled).toHaveBeenCalledWith(345)
        done()
      })
  })
})

/**
 * 使用 fulfilled 状态的 thenable 对象（类 Promise）作为 resolve 方法的参数。
 */
describe('MyPromise‘s resolve function called with a fulfilled thenable as parameter', () => {
  it('one thenable, should be resolved with 666', done => {
    const onFulfilled = jest.fn()
    new MyPromise((resolve: (arg0: Promise<number>) => void) => {
      resolve(
        new Promise(resolve => {
          setTimeout(() => {
            resolve(666)
          }, 0)
        })
      )
    })
      .then(onFulfilled)
      .finally(() => {
        expect(onFulfilled).toHaveBeenCalledTimes(1)
        expect(onFulfilled).toHaveBeenCalledWith(666)
        done()
      })
  })

  it('nesting thenable, should be resolved with 555', done => {
    const onFulfilled = jest.fn()
    new Promise(resolve => {
      resolve(
        new Promise(res => {
          res(
            new Promise(resolve => {
              setTimeout(() => {
                resolve(555)
              }, 0)
            })
          )
        })
      )
    })
      .then(onFulfilled)
      .finally(() => {
        expect(onFulfilled).toHaveBeenCalledTimes(1)
        expect(onFulfilled).toHaveBeenCalledWith(555)
        done()
      })
  })

  it('thenable‘s then function will be called twice, but promise should only be resolved once', done => {
    const onFulfilled = jest.fn()
    new MyPromise((resolve: (arg0: PromiseLike<any>) => void) => {
      const innerPromise = changeThenToInvokeTwice(
        new MyPromise((resolve: (arg0: number) => void) => {
          setTimeout(() => {
            resolve(444)
          }, 0)
        })
      )
      resolve(innerPromise)
    })
      .then(onFulfilled)
      .finally(() => {
        expect(onFulfilled).toHaveBeenCalledTimes(1)
        expect(onFulfilled).toHaveBeenCalledWith(444)
        done()
      })
  })
})

/**
 * 使用 rejected 状态的 thenable 对象（类 Promise）作为 resolve 方法的参数。
 */
describe('MyPromise‘s resolve function called with a rejected thenable as parameter', () => {
  it('should be rejected with 333', done => {
    const onRejected = jest.fn()
    new MyPromise((resolve: (arg0: Promise<number>) => void) => {
      resolve(
        new Promise((resolve, reject) => {
          reject(333)
        })
      )
    })
      .catch(onRejected)
      .finally(() => {
        expect(onRejected).toHaveBeenCalledTimes(1)
        expect(onRejected).toHaveBeenCalledWith(333)
        done()
      })
  })

  it('thenable‘s then function will be called twice, but promise should only be rejected once', done => {
    const onRejected = jest.fn()
    new MyPromise((resolve: (arg0: PromiseLike<any>) => void) => {
      const innerPromise = changeThenToInvokeTwice(
        new MyPromise((resolve: any, reject: (arg0: number) => void) => {
          setTimeout(() => {
            reject(222)
          }, 0)
        })
      )
      resolve(innerPromise)
    })
      .catch(onRejected)
      .finally(() => {
        expect(onRejected).toHaveBeenCalledTimes(1)
        expect(onRejected).toHaveBeenCalledWith(222)
        done()
      })
  })
})
