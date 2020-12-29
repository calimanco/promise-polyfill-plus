// no-promise-environment
const NodeEnvironment = require('jest-environment-node')

class NoPromiseEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
    this.testPath = context.testPath
    this.docblockPragmas = context.docblockPragmas
  }
  async setup() {
    await super.setup()

    setTimeout(()=>{
      this.global.Promise = undefined
    })
  }
}

module.exports = NoPromiseEnvironment
