import MyPromise from '../src/index'

/**
 * 实例化测试
 */
describe('MyPromise init test', () => {
  let promise = new MyPromise((resolve: (arg0: number) => void) => {
    resolve(123)
  })

  it('should be MyPromise instance', () => {
    expect(promise).toEqual(expect.any(MyPromise))
  })

  it('should have then function', () => {
    expect(promise.then).toEqual(expect.any(Function))
  })

  it('should have catch function', () => {
    expect(promise.catch).toEqual(expect.any(Function))
  })

  it('should have finally function', () => {
    expect(promise.finally).toEqual(expect.any(Function))
  })
})
