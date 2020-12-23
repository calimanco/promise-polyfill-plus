# promise-polyfill-plus

[![Build Status](https://travis-ci.com/calimanco/promise-polyfill-plus.svg?branch=main)](https://travis-ci.com/calimanco/promise-polyfill-plus)
[![Coverage Status](https://coveralls.io/repos/github/calimanco/promise-polyfill-plus/badge.svg?branch=main)](https://coveralls.io/github/calimanco/promise-polyfill-plus?branch=main)

## Intro

A polyfill of the Promise, which is written with TypeScript and with no dependence.  
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

Custom Promise implementation，mount the static method to the specified promise constructor.

```javascript
import { initPromise } from 'promise-polyfill-plus'

const MyPromise = initPromise(Promise)
```

You can replace the original Promise.

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

## Features

- The instance Follow the standard of Promise A+ (e.g. then method)
- Instance method
  * [x] Promise.prototype.catch()
  * [x] Promise.prototype.finally()
- Check and throw the "circular reference" error
- Check and throw "wait for never run promise" error (same promise chain)
- Simulate native printing "Uncaught" errors on the console
- initPromise：For custom promise implementations (which may lose the above features)
- Static method
  * [x] Promise.all()
  * [x] Promise.race()
  * [x] Promise.resolve()
  * [x] Promise.reject()
  * [ ] Promise.deferred()
  * [ ] Promise.allSettled()
  * [ ] Promise.any()
  * [ ] Promise.try()
