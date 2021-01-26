# promise-polyfill-plus

[![Build Status](https://travis-ci.com/calimanco/promise-polyfill-plus.svg?branch=main)](https://travis-ci.com/calimanco/promise-polyfill-plus)
[![Coverage Status](https://coveralls.io/repos/github/calimanco/promise-polyfill-plus/badge.svg?branch=main)](https://coveralls.io/github/calimanco/promise-polyfill-plus?branch=main)
[![NPM](https://img.shields.io/npm/l/promise-polyfill-plus)](https://www.npmjs.com/package/promise-polyfill-plus)
[![npm bundle size](https://img.shields.io/bundlephobia/min/promise-polyfill-plus)](https://www.npmjs.com/package/promise-polyfill-plus)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intro

A polyfill of the Promise, which is written with TypeScript and without any dependence.  
Base the standard of Promise A+. More extended static methods will be added.  

---

[中文版](https://github.com/calimanco/promise-polyfill-plus/blob/main/README.md)

## Install

```bash
npm install promise-polyfill-plus --save
```

## Usage

import to the code directly.

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

The native Promise can be automatically enhanced. If the environment does not have native support, mount the polyfill version globally.

```javascript
import 'promise-polyfill-plus/auto'
// or
require('promise-polyfill-plus/auto')
```

If you want to use it directly in HTML, please go to the Github Releases page to download the latest version of the JS file. There are supplying two versions, compressed and uncompressed.  
You can also use the following cdn link, there are also two versions to choose from.  

```html
<!--Uncompressed umd version-->
<scirpt src='https://cdn.jsdelivr.net/npm/promise-polyfill-plus@1/dist/promise-polyfill-plus.umd.auto.js'></scirpt>
<!--Compressed umd version-->
<scirpt src='https://cdn.jsdelivr.net/npm/promise-polyfill-plus@1/dist/promise-polyfill-plus.umd.auto.min.js'></scirpt>
```

## Features

- The instance follows the standard of Promise A+, also implements the common but nonstandard catch and finally methods.
  - [x] Promise.prototype.catch()
  - [x] Promise.prototype.finally()
- Check and throw the "circular reference" error.
- Check and throw "wait for never run promise" error (in same promise chain).
- Simulate native printing "Uncaught" errors on the console (the output of browser and node environment is different).
- It can customize promise implementation and directly extend existing promise constructors.
- Tool function
  - [x] [initPromise()](#initpromise)
  - [x] [autoPolyfill()](#autopolyfill)
- Static method
  - [x] [Promise.all()](#promiseall)
  - [x] [Promise.race()](#promiserace)
  - [x] [Promise.resolve()](#promiseresolve)
  - [x] [Promise.reject()](#promisereject)
  - [x] [Promise.deferred()](#promisedeferred)
  - [x] [Promise.allSettled()](#promiseallsettled)
  - [x] [Promise.any()](#promiseany)
  - [x] [Promise.try()](#promisetry)

## Explanation

Promise A + stipulates that promise belongs to microtask. In this project, setTimeout of macrotask is used instead of it to implement async.  
Running rules in different versions of the browser and node environment may be different.

## API

### Tool function

#### initPromise()

`initPromise(PromiseConstructor): NewPromiseConstructor`

- PromiseConstructor：The constructor of a Promise, which can be a native implementation or various implementations that conform to the Promise A+ standard.
- NewPromiseConstructor：New constructor with extended static methods.

Custom Promise implementation，mount the static method to the specified promise constructor (if missing).

```javascript
import { initPromise } from 'promise-polyfill-plus'

const PromisePlus = initPromise(CustomPromise)
```

#### autoPolyfill()

Promise polyfill for the current operating environment automatically.  
If there is no global Promise support, the built-in Promise will be directly mounted to the global;  
If there is global Promise support, the existing Promise constructor will be expanded and mounted to the global.  

```javascript
import { autoPolyfill } from 'promise-polyfill-plus'

autoPolyfill()
```

### Static method

#### Promise.all()

`Promise.all(promiseArray): PromiseInstance`

- promiseArray：An array of Promise instances.
- PromiseInstance：New Promise instance.

Used to wrap multiple Promise instances into a new Promise instance.  
All Promise instances in promiseArray become fulfilled state, then PromiseInstance becomes fulfilled state and callback returns the corresponding result array;  
A Promise instance in promiseArray becomes rejected state, then PromiseInstance becomes rejected state and callback returns the error.  
It is often used when you need to wait for multiple tasks to complete before executing the next step.  

```javascript
import PromisePlus from 'promise-polyfill-plus'
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return new PromisePlus(resolve => resolve(id))
})
PromisePlus.all(promises)
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

- promiseArray：An array of Promise instances.
- PromiseInstance：New Promise instance.

Used to wrap multiple Promise instances into a new Promise instance.  
A Promise instance in promiseArray becomes fulfilled state, then PromiseInstance becomes fulfilled state and callback returns the result;  
A Promise instance in promiseArray becomes rejected state, then PromiseInstance becomes rejected state and callback returns the error.  
It is often used in scenarios where timeout errors need to be thrown. In the following example, if there is no result for 5 seconds, a timeout error will be triggered.  

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

- value：Optional, the value of onFulfilled callback.
- PromiseInstance：Promise instance.

Used to generate a Promise instance in a Fulfilled state。  
It is equivalent to the following：

```javascript
import PromisePlus from 'promise-polyfill-plus'
PromisePlus.resolve('foo')
// Equivalent to
new PromisePlus(resolve => resolve('foo'))
```

#### Promise.reject()

`Promise.reject([reason]): PromiseInstance`

- reason：Optional, the value of onRejected callback.
- PromiseInstance：Promise instance.

Used to generate a Promise instance in a Rejected state。  
It is equivalent to the following：

```javascript
import PromisePlus from 'promise-polyfill-plus'
PromisePlus.reject('foo')
// Equivalent to
new PromisePlus((resolve, reject) => reject('foo'))
```

#### Promise.deferred()

`Promise.deferred(): DeferredMyPromiseInstance`

- DeferredMyPromiseInstance：Promise instance with extended delay feature, which has "resolve" and "reject" method.

It is often used to generate a Promise instance with extended delay feature, In other words, it can resolve or reject externally.  
Often used in process control, where a delayed start is required.  

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

- promiseArray：An array of Promise instances.
- PromiseInstance：New Promise instance.

Used to wrap multiple Promise instances into a new Promise instance.  
Similar to Promise.all(), but it will not be interrupted by a Promise instance being rejected, and will wait for all Promise instances in the promiseArray to become fulfilled or rejected before making a callback.  
The result returned by the callback is an array of objects containing status, value, and reason fields.  

```javascript
import PromisePlus from 'promise-polyfill-plus'
const resolved = PromisePlus.resolve(42)
const rejected = PromisePlus.reject(-1)

const allSettledPromise = PromisePlus.allSettled([resolved, rejected])

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

- ReturnPromiseLikeFn：A function that returns a PromiseLike (Thenable) object. 
- PromiseInstance：Promise instance.

It is used to wrap a function that returns a PromiseLike (Thenable) object, which can catch synchronous errors for a unified error handling mechanism.  
In the following example, getUsername may have a synchronization error. Generally, it needs to be caught in the outer try...catch, but using Promise.try() can be handled in Promise.prototype.catch(). 

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

- promiseArray：An array of Promise instances.
- PromiseInstance：New Promise instance.

Used to wrap multiple Promise instances into a new Promise instance.  
A Promise instance in promiseArray becomes fulfilled state, then PromiseInstance becomes fulfilled state and callback returns the result;  
All Promise instances in promiseArray become fulfilled state, then PromiseInstance becomes fulfilled state and callback returns the corresponding result array.  
Similar to Promise.race(), but it will not be interrupted by a Promise instance being rejected.  

```javascript
import PromisePlus from 'promise-polyfill-plus'
const resolved = PromisePlus.resolve(42)
const rejected = PromisePlus.reject(-1)
const alsoRejected = PromisePlus.reject(Infinity)

PromisePlus.any([resolved, rejected, alsoRejected]).then(result => {
  console.log(result) // 42
})

PromisePlus.any([rejected, alsoRejected]).catch(results => {
  console.log(results) // [-1, Infinity]
})
```

## LICENSE

MIT
