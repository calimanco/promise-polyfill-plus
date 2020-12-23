import MyPromise from './../src/index'

/**
 * 一些以外错误
 */
describe('some unexpected error test', () => {
  it('should throw "Chaining cycle detected for promise" error ', done => {
    const promise: any = new MyPromise((resolve: (arg0: number) => void) => {
      resolve(123)
    }).then(() => {
      return promise
    })
    promise.catch((reason: any) => {
      expect(reason).toEqual(expect.any(Error))
      done()
    })
  })

  it('should throw "the promise will never be resolved" error', done => {
    const onFulfilled = jest.fn()
    const promise: any = new MyPromise((resolve: (arg0: number) => void) => {
      setTimeout(() => {
        resolve(123)
      })
    })
      .then(() => {
        return promise
      })
      .then(() => {
        return promise
      })
      .then(onFulfilled)

    promise.catch((reason: any) => {
      expect(onFulfilled).toHaveBeenCalledTimes(0)
      expect(reason).toEqual(expect.any(Error))
      done()
    })
  })
})

/**
 * 一些编码错误
 */
describe('executor function occurs error', () => {
  it('should catch an error', done => {
    const onFulfilled = jest.fn()
    new MyPromise((resolve: (arg0: number) => void) => {
      let a: any = 1
      a.run()
      resolve(1)
    })
      .then(onFulfilled)
      .catch((reason: any) => {
        expect(onFulfilled).toHaveBeenCalledTimes(0)
        expect(reason).toEqual(expect.any(TypeError))
        done()
      })
  })
})
