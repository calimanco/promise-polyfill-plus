import MyPromise from '../src/index'

describe('MyPromise‘s static all function test', () => {
  it('all function base test', done => {
    MyPromise.all([
      new MyPromise((resolve: (arg0: number) => void) => {
        setTimeout(() => {
          resolve(123)
        }, 100)
      }),
      new MyPromise((resolve: (arg0: number) => void) => {
        setTimeout(() => {
          resolve(456)
        }, 10)
      })
    ]).then((value: number[]) => {
      expect(value).toEqual([123, 456])
      done()
    })
  })

  it('should be a reject error', done => {
    const onFulfilled = jest.fn()
    MyPromise.all([
      new MyPromise((resolve, reject) => {
        reject(123)
      }),
      new MyPromise((resolve: (arg0: number) => void) => {
        setTimeout(() => {
          resolve(456)
        }, 10)
      })
    ])
      .then(onFulfilled)
      .catch(reason => {
        expect(onFulfilled).toHaveBeenCalledTimes(0)
        expect(reason).toBe(123)
        done()
      })
  })
})

describe('MyPromise‘s static race function test', () => {
  it('race function base test', done => {
    MyPromise.race([
      new MyPromise((resolve: (arg0: number) => void) => {
        resolve(123)
      }),
      new MyPromise((resolve: (arg0: number) => void) => {
        setTimeout(() => {
          resolve(456)
        }, 10)
      })
    ]).then(value => {
      expect(value).toEqual(123)
      done()
    })
  })
})

describe('MyPromise‘s static resolve function test', () => {
  it('resolve function base test', done => {
    MyPromise.resolve().then(value => {
      expect(value).toBe(undefined)
      done()
    })
  })
})

describe('MyPromise‘s static reject function test', () => {
  it('reject function base test', done => {
    MyPromise.reject(123).catch(reason => {
      expect(reason).toBe(123)
      done()
    })
  })
})

describe('MyPromise‘s static deferred function test', () => {
  it('deferred function resolve test', done => {
    const a = MyPromise.deferred()
    a.resolve(123)
    a.then(value => {
      expect(value).toBe(123)
      done()
    })
  })

  it('deferred function reject test', done => {
    const a = MyPromise.deferred()
    a.catch(reason => {
      expect(reason).toBe(123)
      done()
    })
    a.reject(123)
  })
})

describe('MyPromise‘s static allSettled function test', () => {
  it('allSettled function base test', done => {
    const onRejected = jest.fn()
    MyPromise.allSettled([
      new MyPromise((resolve: (arg0: number) => void) => {
        setTimeout(() => {
          resolve(123)
        }, 100)
      }),
      new MyPromise((resolve, reject) => {
        setTimeout(() => {
          reject(456)
        }, 10)
      })
    ])
      .then(value => {
        expect(value).toEqual([
          {
            status: 'fulfilled',
            value: 123,
            reason: null
          },
          {
            status: 'rejected',
            value: null,
            reason: 456
          }
        ])
      })
      .catch(onRejected)
      .then(() => {
        expect(onRejected).toHaveBeenCalledTimes(0)
        done()
      })
  })
})
