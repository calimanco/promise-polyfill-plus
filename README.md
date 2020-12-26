# promise-polyfill-plus

[![Build Status](https://travis-ci.com/calimanco/promise-polyfill-plus.svg?branch=main)](https://travis-ci.com/calimanco/promise-polyfill-plus)
[![Coverage Status](https://coveralls.io/repos/github/calimanco/promise-polyfill-plus/badge.svg?branch=main)](https://coveralls.io/github/calimanco/promise-polyfill-plus?branch=main)
[![NPM](https://img.shields.io/npm/l/promise-polyfill-plus)](https://www.npmjs.com/package/promise-polyfill-plus)
[![npm bundle size](https://img.shields.io/bundlephobia/min/promise-polyfill-plus)](https://www.npmjs.com/package/promise-polyfill-plus)

## 简介

一个用 TypeScript 编写并且不依赖其他包的 Promise polyfill（实现原生环境未实现的 API）。  
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
import MyPromise from 'promise-polyfill-plus'

new MyPromise((resolve, reject) => {
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

自定义 Promise 实现，将静态方法挂载到指定的 Promise 构造函数（如缺少）。

```javascript
import { initPromise } from 'promise-polyfill-plus'

const MyPromise = initPromise(Promise)
```

可以替换掉原生的 Promise。

```javascript
import MyPromise from 'promise-polyfill-plus'
// browser
if (window && typeof window.Promise !== 'function') {
  window.Promise = MyPromise
}
// nodejs
if (global && typeof global.Promise !== 'function') {
  global.Promise = MyPromise
}
```

## 特性

- 实例部分遵循 Promise A+ 规范，也实现了常用但非规范的 catch 和 finally 方法。
  * [x] Promise.prototype.then()
  * [x] Promise.prototype.catch()
  * [x] Promise.prototype.finally()
- 检查并抛出"循环引用"的错误。
- 检查并抛出"等待永不运行 promise"的错误（同一 promise 链中）。
- 模拟原生在控制台打印"未捕获"的错误（浏览器和 Node 环境输出有差异）。
- 可自定义 Promise 实现，直接扩展已有的 Promise 构造函数。
- 工具函数
  * [x] initPromise()
- 静态方法
  * [x] Promise.all()
  * [x] Promise.race()
  * [x] Promise.resolve()
  * [x] Promise.reject()
  * [x] Promise.deferred()
  * [x] Promise.allSettled()
  * [x] Promise.any()
  * [x] Promise.try()

## 说明

Promise A+ 规范里规定 Promise 属于微任务（microtask），本项目使用宏任务（macrotask）的 setTimeout 来代替实现异步。  
在不同版本的浏览器和 Node 环境中运行规则可能有些不同。

## API

// TODO

## 许可证
MIT
