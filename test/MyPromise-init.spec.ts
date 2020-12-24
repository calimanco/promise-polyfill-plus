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

  it('should not add method', () => {
    const newPromise = initPromise(Promise)
    expect(newPromise.all).not.toEqual(MyPromise.all)
    expect(newPromise.race).not.toEqual(MyPromise.race)
    expect(newPromise.resolve).not.toEqual(MyPromise.resolve)
    expect(newPromise.reject).not.toEqual(MyPromise.reject)
  })
})
