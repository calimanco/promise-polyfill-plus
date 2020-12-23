import MyPromise, { initPromise } from '../src/index'

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

/**
 * 测试初始化函数
 */
describe('init function test', () => {
  it('should be "not a constructor" error', () => {
    const a = {}
    try {
      initPromise(a as any)
    } catch (e) {
      expect(e).toEqual(expect.any(TypeError))
    }
  })

  it('should be "not a PromiseConstructorLike" error', () => {
    function A(this: any) {
      this.a = 123
    }
    try {
      initPromise(A as any)
    } catch (e) {
      expect(e).toEqual(expect.any(TypeError))
    }
  })

  it('should be add method', () => {
    const newPromise = initPromise(Promise)
    expect(newPromise.all).toEqual(expect.any(Function))
    expect(newPromise.race).toEqual(expect.any(Function))
    expect(newPromise.resolve).toEqual(expect.any(Function))
    expect(newPromise.reject).toEqual(expect.any(Function))
  })
})
