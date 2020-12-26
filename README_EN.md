# promise-polyfill-plus

[![Build Status](https://travis-ci.com/calimanco/promise-polyfill-plus.svg?branch=main)](https://travis-ci.com/calimanco/promise-polyfill-plus)
[![Coverage Status](https://coveralls.io/repos/github/calimanco/promise-polyfill-plus/badge.svg?branch=main)](https://coveralls.io/github/calimanco/promise-polyfill-plus?branch=main)
[![NPM](https://img.shields.io/npm/l/promise-polyfill-plus)](https://www.npmjs.com/package/promise-polyfill-plus)
[![npm bundle size](https://img.shields.io/bundlephobia/min/promise-polyfill-plus)](https://www.npmjs.com/package/promise-polyfill-plus)

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

Custom Promise implementation，mount the static method to the specified promise constructor (if missing).

```javascript
import { initPromise } from 'promise-polyfill-plus'

const MyPromise = initPromise(Promise)
```

You can replace the original Promise.

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

## Features

- The instance follows the standard of Promise A+, also implements the common but nonstandard catch and finally methods.
  * [x] Promise.prototype.catch()
  * [x] Promise.prototype.finally()
- Check and throw the "circular reference" error.
- Check and throw "wait for never run promise" error (in same promise chain).
- Simulate native printing "Uncaught" errors on the console (the output of browser and node environment is different).
- It can customize promise implementation and directly extend existing promise constructors.
- Tool function
  * [x] initPromise()
- Static method
  * [x] Promise.all()
  * [x] Promise.race()
  * [x] Promise.resolve()
  * [x] Promise.reject()
  * [x] Promise.deferred()
  * [x] Promise.allSettled()
  * [x] Promise.any()
  * [x] Promise.try()

## Explanation

Promise A + stipulates that promise belongs to microtask. In this project, setTimeout of macrotask is used instead of it to implement async.  
Running rules in different versions of the browser and node environment may be different.

## API

// TODO

## LICENSE

MIT
