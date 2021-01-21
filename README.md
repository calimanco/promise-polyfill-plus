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
import PromisePlus from 'promise-polyfill-plus'
// or
const PromisePlus = require('promise-polyfill-plus').default

new PromisePlus((resolve, reject) => {
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

可以自动增强原生的 Promise。如果环境无原生支持则使用 polyfill 版本挂载到全局。

```javascript
import 'promise-polyfill-plus/auto'
// or
require('promise-polyfill-plus/auto')
```

如果你想直接在 HTML 中使用，请到 Github Releases 页面下载最新版本的 JS 文件，有压缩和未压缩两个版本以供选择。  
也可以使用下面的 cdn 链接，同样有两个版本供选择。  

```html
<!--Uncompressed umd version-->
<scirpt src='https://cdn.jsdelivr.net/npm/promise-polyfill-plus@1/dist/promise-polyfill-plus.umd.auto.js'></scirpt>
<!--Compressed umd version-->
<scirpt src='https://cdn.jsdelivr.net/npm/promise-polyfill-plus@1/dist/promise-polyfill-plus.umd.auto.min.js'></scirpt>
```

## 特性

- 实例部分遵循 Promise A+ 规范，也实现了常用但非规范的 catch 和 finally 方法。
  - [x] Promise.prototype.then()
  - [x] Promise.prototype.catch()
  - [x] Promise.prototype.finally()
- 检查并抛出"循环引用"的错误。
- 检查并抛出"等待永不运行 promise"的错误（同一 promise 链中）。
- 模拟原生在控制台打印"未捕获"的错误（浏览器和 Node 环境输出有差异）。
- 可自定义 Promise 实现，直接扩展已有的 Promise 构造函数。
- 工具函数
  - [x] [initPromise()](#initpromise)
  - [x] [autoPolyfill()](#autopolyfill)
- 静态方法
  - [x] [Promise.all()](#promiseall)
  - [x] [Promise.race()](#promiserace)
  - [x] [Promise.resolve()](#promiseresolve)
  - [x] [Promise.reject()](#promisereject)
  - [x] [Promise.deferred()](#promisedeferred)
  - [x] [Promise.allSettled()](#promiseallsettled)
  - [x] [Promise.any()](#promiseany)
  - [x] [Promise.try()](#promisetry)

## 说明

Promise A+ 规范里规定 Promise 属于微任务（microtask），本项目使用宏任务（macrotask）的 setTimeout 来代替实现异步。  
在不同版本的浏览器和 Node 环境中运行规则可能有些不同。

## API

### 工具函数

#### initPromise()

`initPromise(PromiseConstructor): NewPromiseConstructor`

- PromiseConstructor：一个 Promise 的构造函数，可以是原生实现，也可以是各类符合 Promise A+ 规范的实现。
- NewPromiseConstructor：扩展了静态方法的新构造函数。

用于自定义 Promise 实现，将静态方法挂载到指定的 Promise 构造函数（如缺少）。

```javascript
import { initPromise } from 'promise-polyfill-plus'

const PromisePlus = initPromise(CustomPromise)
```

#### autoPolyfill()

自动对当前运行环境进行 Promise Polyfill。  
如果全局没有 Promise 支持，则会直接将内置的 Promise 实现挂载到全局；  
如果全局已有 Promise 支持，则会对现有的 Promise 构造函数进行扩展后挂载到全局。  

```javascript
import { autoPolyfill } from 'promise-polyfill-plus'

autoPolyfill()
```

### 静态方法

#### Promise.all()

`Promise.all(promiseArray): PromiseInstance`

- promiseArray：一个由 Promise 实例组成的数组。
- PromiseInstance：新的 Promise 实例。

用于将多个 Promise 实例，包装成一个新的 Promise 实例。  
promiseArray 里全部 Promise 实例都变为 fulfilled 状态，则 PromiseInstance 变成 fulfilled 状态并回调返回对应结果的数组；  
promiseArray 里一个 Promise 实例变为 rejected 状态，则 PromiseInstance 变成 rejected 状态并回调返回该错误。  
常用于需要等待多个任务完成再执行下一步的常见。

```javascript
import PromisePlus from 'promise-polyfill-plus'
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return new PromisePlus(resolve => resolve(id))
})
Promise.all(promises)
  .then(value => {
    console.log(value) // [2, 3, 5, 7, 11, 13]
    // do something
  })
  .catch(reason => {
    // do something
  })
```

#### Promise.race()

`Promise.race(promiseArray): PromiseInstance`

- promiseArray：一个由 Promise 实例组成的数组。
- PromiseInstance：新的 Promise 实例。

用于将多个 Promise 实例，包装成一个新的 Promise 实例。  
promiseArray 里一个 Promise 实例变为 fulfilled 状态，则 PromiseInstance 变成 fulfilled 状态并回调返回该结果；  
promiseArray 里一个 Promise 实例变为 rejected 状态，则 PromiseInstance 变成 rejected 状态并回调返回该错误。  
常用于抛出超时错误的场景。下面的例子中如果 5 秒未有结果则触发超时错误。

```javascript
import PromisePlus from 'promise-polyfill-plus'
const p = PromisePlus.race([
  fetch('/resource-that-may-take-a-while'),
  new PromisePlus((resolve, reject) => {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])

p.then(value => {
  // do something
}).catch(reason => {
  // do something
})
```

#### Promise.resolve()

`Promise.resolve([value]): PromiseInstance`

- value：可选，onFulfilled 回调的值。
- PromiseInstance：Promise 实例。

用于生成一个 Fulfilled 状态的 Promise 实例。  
与下面的写法是等价的：

```javascript
import PromisePlus from 'promise-polyfill-plus'
PromisePlus.resolve('foo')
// Equivalent to
new PromisePlus(resolve => resolve('foo'))
```

#### Promise.reject()

`Promise.reject([reason]): PromiseInstance`

- reason：可选，onRejected 回调的值。
- PromiseInstance：Promise 实例。

用于生成一个 Rejected 状态的 Promise 实例。  
与下面的写法是等价的：

```javascript
import PromisePlus from 'promise-polyfill-plus'
PromisePlus.reject('foo')
// Equivalent to
new PromisePlus((resolve, reject) => reject('foo'))
```

#### Promise.deferred()

`Promise.deferred(): DeferredMyPromiseInstance`

- DeferredMyPromiseInstance：扩展了延迟特性的 Promise 实例，增加了 resolve 和 reject 方法。

用于生成一个扩展了延迟特性的 Promise 实例，也就是说它可以在外部进行 resolve 或 reject。  
常用于流程控制里，需要延迟启动的场景。

```javascript
import PromisePlus from 'promise-polyfill-plus'
const p = PromisePlus.deferred()
// The following code will not be executed immediately
p.then(value => {
  // do something
}).catch(reason => {
  // do something
})
// after do something, start to execute the above code
p.resolve(123)
```

#### Promise.allSettled()

`Promise.allSettled(promiseArray): PromiseInstance`

- promiseArray：一个由 Promise 实例组成的数组。
- PromiseInstance：新的 Promise 实例。

用于将多个 Promise 实例，包装成一个新的 Promise 实例。  
与 Promise.all() 类似，但它不会被某个 Promise 实例 rejected 而打断，并会等待 promiseArray 里所有 Promise 实例变成 fulfilled 或 rejected 状态再进行回调。  
回调返回的结果是一个由包含 status、value、reason 字段的对象组成的数组。

```javascript
import PromisePlus from 'promise-polyfill-plus'
const resolved = PromisePlus.resolve(42)
const rejected = PromisePlus.reject(-1)

const allSettledPromise = Promise.allSettled([resolved, rejected])

allSettledPromise.then(function (results) {
  console.log(results)
  // [
  //    { status: 'fulfilled', value: 42, reason: null },
  //    { status: 'rejected', value: null, reason: -1 }
  // ]
})
```

#### Promise.try()

`Promise.try(ReturnPromiseLikeFn): PromiseInstance`

- ReturnPromiseLikeFn：一个返回 PromiseLike（Thenable） 对象的函数。
- PromiseInstance：Promise 实例。

用于包装一个会返回 PromiseLike（Thenable） 对象的函数，可以捕获同步错误进行统一错误处理机制。  
下面的例子中，getUsername 可能发生同步错误，一般要在外层 try...catch 捕获，而使用 Promise.try() 就可以统一在 Promise.prototype.catch() 里处理。

```javascript
import PromisePlus from 'promise-polyfill-plus'
function getUsername(userId) {
  // do something
  return database.users.get({ id: userId })
}
PromisePlus.try(() => getUsername(123))
  .then(value => {
    // do something
  })
  .catch(reason => {
    // do something
  })
```

#### Promise.any()

`Promise.any(promiseArray): PromiseInstance`

- promiseArray：一个由 Promise 实例组成的数组。
- PromiseInstance：新的 Promise 实例。

用于将多个 Promise 实例，包装成一个新的 Promise 实例。
promiseArray 里一个 Promise 实例变为 fulfilled 状态，则 PromiseInstance 变成 fulfilled 状态并回调返回该结果；  
promiseArray 里全部 Promise 实例都变为 rejected 状态，则 PromiseInstance 变成 rejected 状态并回调返回对应结果的数组。  
与 Promise.race() 类似，但它不会被某个 Promise 实例 rejected 而打断。

```javascript
import PromisePlus from 'promise-polyfill-plus'
const resolved = PromisePlus.resolve(42)
const rejected = PromisePlus.reject(-1)
const alsoRejected = PromisePlus.reject(Infinity)

Promise.any([resolved, rejected, alsoRejected]).then(result => {
  console.log(result) // 42
})

Promise.any([rejected, alsoRejected]).catch(results => {
  console.log(results) // [-1, Infinity]
})
```

## 许可证

MIT
