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
  it('should never be rejected', done => {
    const onRejected = jest.fn()
    MyPromise.allSettled([
      new MyPromise((resolve, reject) => {
        setTimeout(() => {
          reject(456)
        }, 10)
      })
    ])
      .catch(onRejected)
      .then(() => {
        expect(onRejected).toHaveBeenCalledTimes(0)
        done()
      })
  })

  it('last invoke is fulfilled promise', done => {
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
    ]).then(value => {
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
      done()
    })
  })

  it('last invoke is rejected promise', done => {
    MyPromise.allSettled([
      new MyPromise((resolve: (arg0: number) => void) => {
        setTimeout(() => {
          resolve(123)
        }, 10)
      }),
      new MyPromise((resolve, reject) => {
        setTimeout(() => {
          reject(456)
        }, 100)
      })
    ]).then(value => {
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
      done()
    })
  })
})

describe('MyPromise‘s static try function test', () => {
  it('try function base test', done => {
    const onFulfilled = jest.fn()
    const database = {
      get: () =>
        new Promise(resolve => {
          resolve('lin')
        })
    }
    function getUsername() {
      // here will throw wrong
      let a: any = 1
      a.run()
      return database.get().then(function (userName) {
        return userName
      })
    }

    MyPromise.try(() => getUsername())
      .then(onFulfilled)
      .catch(reason => {
        expect(onFulfilled).toHaveBeenCalledTimes(0)
        expect(reason).toEqual(expect.any(TypeError))
        done()
      })
  })
})

describe('MyPromise‘s static any function test', () => {
  it('should be fulfilled with 123', done => {
    MyPromise.any([MyPromise.resolve(123), MyPromise.reject(456)]).then(
      value => {
        expect(value).toBe(123)
        done()
      }
    )
  })
  it('should be rejected with a array', done => {
    const onFulfilled = jest.fn()
    MyPromise.any([MyPromise.reject(123), MyPromise.reject(456)])
      .then(onFulfilled)
      .catch(reason => {
        expect(onFulfilled).toHaveBeenCalledTimes(0)
        expect(reason).toEqual([123, 456])
        done()
      })
  })
})
