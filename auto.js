'use strict'

const { join } = require('path')
const { main } = require('./package.json')
require(join(__dirname, main)).autoPolyfill()
