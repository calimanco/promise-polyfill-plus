import MyPromise from '../src/index'
import OriginMyPromise from '../src/core/MyPromise'
import { changeThenToInvokeTwice, changeThenToThrowError } from './util'

/**
 * then 方法的基本测试。
 */
describe('MyPromise‘s then function base test', () => {
  it('then function should return new Promise, should be resolved with 123', done => {
    const thenResult = new MyPromise((resolve: (arg0: number) => void) => {
      resolve(123)
    }).then((value: any) => {
      expect(value).toBe(123)
      done()
    })
    expect(thenResult).toEqual(expect.any(OriginMyPromise))
  })

  it('then function call with void, should be resolved with 456', done => {
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(456)
    })
      .then()
      .then((value: any) => {
        expect(value).toBe(456)
        done()
      })
  })

  it('then function call with fulfilled thenable, should be resolved with 789', done => {
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(456)
    })
      .then(() => {
        return new Promise(resolve => {
          resolve(789)
        })
      })
      .then((value: any) => {
        expect(value).toBe(789)
        done()
      })
  })

  it('then function call with rejected thenable, should be resolved with 111', done => {
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(456)
    })
      .then(() => {
        return new Promise((resolve, reject) => {
          reject(111)
        })
      })
      .catch((reason: any) => {
        expect(reason).toBe(111)
        done()
      })
  })

  it('then function call with thenable which then function will throw error', done => {
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(456)
    })
      .then(() => {
        return changeThenToThrowError(
          new Promise(resolve => {
            resolve(222)
          })
        )
      })
      .catch((reason: any) => {
        expect(reason).toEqual(expect.any(TypeError))
        done()
      })
  })
})

describe('MyPromise‘s then function call with thenable which then function will be called twice', () => {
  it('return a fulfilled thenable, promise should only be resolved once', done => {
    const onFulfilled = jest.fn()
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(456)
    })
      .then(() => {
        return changeThenToInvokeTwice(
          new MyPromise((resolve: (arg0: number) => void) => {
            resolve(333)
          })
        )
      })
      .then(onFulfilled)
      .finally(() => {
        expect(onFulfilled).toHaveBeenCalledTimes(1)
        expect(onFulfilled).toHaveBeenCalledWith(333)
        done()
      })
  })

  it('return a rejected thenable, promise should only be rejected once', done => {
    const onRejected = jest.fn()
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(456)
    })
      .then(() => {
        return changeThenToInvokeTwice(
          new MyPromise((resolve: any, reject: (arg0: number) => void) => {
            reject(444)
          })
        )
      })
      .catch(onRejected)
      .finally(() => {
        expect(onRejected).toHaveBeenCalledTimes(1)
        expect(onRejected).toHaveBeenCalledWith(444)
        done()
      })
  })

  it('then function will throw error, promise should only be rejected once', done => {
    const onRejected = jest.fn()
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(456)
    })
      .then(() => {
        return changeThenToInvokeTwice(
          changeThenToThrowError(
            new MyPromise((resolve: (arg0: number) => void) => {
              resolve(555)
            })
          )
        )
      })
      .catch(onRejected)
      .finally(() => {
        expect(onRejected).toHaveBeenCalledTimes(1)
        expect(onRejected).toHaveBeenCalledWith(expect.any(TypeError))
        done()
      })
  })
})

/**
 * 使用 then 链式调用
 */
describe('MyPromise‘s then function test by chain calling', () => {
  it('chain calling, result should be 3', done => {
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(1)
    })
      .then((value: number) => {
        return value + 1
      })
      .then((value: number) => {
        return value + 1
      })
      .then((value: number) => {
        expect(value).toBe(3)
        done()
      })
  })
})

/**
 * then 函数的回调函数发生错误
 */
describe('MyPromise‘s then function‘s callback occurs error', () => {
  it('onFulfilled function error when state is PENDING', done => {
    const onFulfilled = jest.fn()
    new MyPromise((resolve: (arg0: number) => void) => {
      setTimeout(() => {
        resolve(999)
      })
    })
      .then(() => {
        const a: any = 1
        a.run()
      })
      .then(onFulfilled)
      .catch((reason: any) => {
        expect(onFulfilled).toHaveBeenCalledTimes(0)
        expect(reason).toEqual(expect.any(TypeError))
        done()
      })
  })

  it('onRejected function error when state is PENDING', done => {
    const onFulfilled = jest.fn()
    new MyPromise((resolve: any, reject: (arg0: number) => void) => {
      setTimeout(() => {
        reject(888)
      })
    })
      .then(null, () => {
        const a: any = 1
        a.run()
      })
      .then(onFulfilled)
      .catch((reason: any) => {
        expect(onFulfilled).toHaveBeenCalledTimes(0)
        expect(reason).toEqual(expect.any(TypeError))
        done()
      })
  })

  it('onFulfilled function error when state is FULFILLED', done => {
    const onFulfilled = jest.fn()
    new MyPromise((resolve: (arg0: number) => void) => {
      resolve(777)
    })
      .then(() => {
        const a: any = 1
        a.run()
      })
      .then(onFulfilled)
      .catch((reason: any) => {
        expect(onFulfilled).toHaveBeenCalledTimes(0)
        expect(reason).toEqual(expect.any(TypeError))
        done()
      })
  })
})
