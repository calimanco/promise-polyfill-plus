import MyPromise from '../src/index'
import {
  isPromiseLike,
  isMyPromise,
  isFunction,
  simulateAsync,
  runOnce,
  checkEnv,
  getArrayRealLen
} from '../src/helpers/util'

describe('isPromiseLike function test', () => {
  it('should be true', () => {
    expect(
      isPromiseLike(
        new Promise(() => {
          // do nothing
        })
      )
    ).toBe(true)
    expect(
      isPromiseLike(
        new MyPromise(() => {
          // do nothing
        })
      )
    ).toBe(true)
  })

  it('should be false', () => {
    expect(isPromiseLike(null)).toBe(false)
    expect(isPromiseLike(123)).toBe(false)
    expect(isPromiseLike('123')).toBe(false)
    expect(isPromiseLike(undefined)).toBe(false)
    expect(isFunction({})).toBe(false)
  })
})

describe('isMyPromise function test', () => {
  it('should be true', () => {
    expect(
      isMyPromise(
        new MyPromise(() => {
          // do nothing
        })
      )
    ).toBe(true)
  })

  it('should be false', () => {
    expect(isMyPromise(null)).toBe(false)
    expect(isMyPromise(123)).toBe(false)
    expect(isMyPromise('123')).toBe(false)
    expect(isMyPromise(undefined)).toBe(false)
    expect(isMyPromise({})).toBe(false)
    expect(
      isMyPromise(
        new Promise(() => {
          // do nothing
        })
      )
    ).toBe(false)
  })
})

describe('isFunction function test', () => {
  it('should be true', () => {
    expect(isFunction(function test() {})).toBe(true)
  })

  it('should be false', () => {
    expect(isFunction(null)).toBe(false)
    expect(isFunction(123)).toBe(false)
    expect(isFunction('123')).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction({})).toBe(false)
  })
})

describe('simulateAsync function test', () => {
  it('should be true', done => {
    const test = jest.fn()
    simulateAsync(test)
    simulateAsync(test, 1)
    setTimeout(() => {
      expect(test).toHaveBeenCalledTimes(2)
      done()
    }, 10)
  })
})

describe('runOnce function test', () => {
  it('should run only once', () => {
    const test = jest.fn()
    const testOnce = runOnce(test)
    testOnce()
    testOnce()
    expect(test).toHaveBeenCalledTimes(1)
  })
})

describe('checkEnv function test', () => {
  it('should be browser', () => {
    expect(checkEnv()).toBe('browser')
  })
  it('should not be node', () => {
    expect(checkEnv()).not.toBe('node')
  })
})

describe('getArrayRealLen function test', () => {
  it('should be 2', () => {
    const arr = []
    arr[1] = 1
    arr[3] = 3
    expect(getArrayRealLen(arr)).toBe(2)
  })
})
