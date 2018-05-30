const spawnSync = require('child_process').spawnSync
const ClosureCompiler = require('google-closure-compiler').compiler

ClosureCompiler.prototype.runSync = function () {
  if (this.logger) {
    this.logger(this.getFullCommand() + '\n')
  }

  return spawnSync(this.javaPath, this.commandArguments, this.spawnOptions)
}

var flags = {
  js: './src/**/*.js',
  compilation_level: 'SIMPLE',
  externs: 'src/externs.js',
  debug: true,
  formatting: 'pretty_print',
  dependency_mode: 'STRICT'
}

/**
 * goog.module('my.test.example')
 * const MyClass = goog.require('my.class')
 *
 * test('something', () => {
 *   expect(true).toBe(true)
 * })
 */

const moduleRegex = /goog\.module\('(.*?)'\)/

module.exports = {
  process (src, path) {
    let match = src.match(moduleRegex)
    if (match.length > 1) {
      flags['entry_point'] = `goog:${match[1]}`
    }
    let closureCompiler = new ClosureCompiler(flags)
    let child = closureCompiler.runSync()
    return child.stdout.toString()
  }
}
