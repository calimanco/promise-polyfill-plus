# promise-polyfill-plus

[![Build Status](https://travis-ci.com/calimanco/promise-polyfill-plus.svg?branch=main)](https://travis-ci.com/calimanco/promise-polyfill-plus)
[![Coverage Status](https://coveralls.io/repos/github/calimanco/promise-polyfill-plus/badge.svg?branch=main)](https://coveralls.io/github/calimanco/promise-polyfill-plus?branch=main)

## 简介

一个用 TypeScript 编写并且不依赖其他包的 Promise polyfill（实现浏览器未实现的 API）。  
基于 Promise A+ 标准实现。更多的扩展静态方法将会加入。

---

[English Version](https://github.com/calimanco/promise-polyfill-plus/blob/main/README_EN.md)

## 安装

```bash
npm install promise-polyfill-plus --save
```

## 使用

直接引用到代码中使用。

```javascript
import MyPromsie from 'promise-polyfill-plus'

new MyPromsie((resolve, reject) => {
  if (true) {
    // do something
    resolve(123)
  } else {
    reject(456)
  }
})
  .then(value => {
    console.log(value)
  })
  .catch(reason => {
    console.log(reason)
  })
```

自定义 Promise 实现，将静态方法挂载到指定的 Promise 构造函数。

```javascript
import { initPromise } from 'promise-polyfill-plus'

const MyPromise = initPromise(Promise)
```

可以替换掉原生的 Promise。

```javascript
import MyPromsie from 'promise-polyfill-plus'
// browser
if (window && typeof window.Promise !== 'function') {
  window.Promise = MyPromsie
}
// nodejs
if (global && typeof global.Promise !== 'function') {
  global.Promise = MyPromsie
}
```

## 特性

- 实例部分遵循 Promise A+ 标准实现（比如 then 方法）
- 实例方法
  * [x] Promise.prototype.catch()
  * [x] Promise.prototype.finally()
- 检查并抛出"循环引用"的错误
- 检查并抛出"等待永不运行 promise"的错误（同一 promise 链）
- 模拟原生在控制台打印"未捕获"的错误
- initPromise：用于自定义 Promise 实现（将可能失去上面的特性）
- 静态方法
  * [x] Promise.all()
  * [x] Promise.race()
  * [x] Promise.resolve()
  * [x] Promise.reject()
  * [ ] Promise.deferred()
  * [ ] Promise.allSettled()
  * [ ] Promise.any()
  * [ ] Promise.try()
