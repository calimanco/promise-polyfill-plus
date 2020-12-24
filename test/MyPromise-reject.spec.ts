import MyPromise from '../src'

/**
 * reject 方法的基本测试。
 */
describe('MyPromise‘s reject function base test', () => {
  it('reject function called once, should be rejected with 123', done => {
    const onRejected = jest.fn()
    const promise = new MyPromise(
      (resolve: any, reject: (arg0: number) => void) => {
        reject(123)
      }
    )
    promise.catch(onRejected).finally(() => {
      expect(onRejected).toHaveBeenCalledTimes(1)
      expect(onRejected).toHaveBeenCalledWith(123)
      done()
    })
  })

  it('reject function called twice, should be rejected with 345', done => {
    const onRejected = jest.fn()
    const promise = new MyPromise(
      (resolve: any, reject: (arg0: number) => void) => {
        reject(345)
        reject(678)
      }
    )
    promise.catch(onRejected).finally(() => {
      expect(onRejected).toHaveBeenCalledTimes(1)
      expect(onRejected).toHaveBeenCalledWith(345)
      done()
    })
  })

  it('not with catch handle, should console a browser "Uncaught Error" log', done => {
    const onFulfilled = jest.fn()
    const spy = jest.spyOn(console, 'error')
    new MyPromise((resolve: any, reject: (arg0: number) => void) => {
      setTimeout(() => {
        reject(123)
      })
    })
      .then(onFulfilled)
      .finally(() => {
        expect(onFulfilled).toHaveBeenCalledTimes(0)
        setTimeout(() => {
          expect(spy).toHaveBeenCalledWith('Uncaught (in promise)', 123)
          done()
        }, 10)
      })
  })
})
