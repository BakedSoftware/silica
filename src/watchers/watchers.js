goog.module('watchers')

const _If = goog.require('watchers.if')
const Repeat = goog.require('watchers.repeat')
// The following just need to call their compiler
const Disabled = goog.require('compilers.disabled')
const Include = goog.require('compilers.include')
const Value = goog.require('compilers.value')

exports = {
  _If: _If,
  Repeat: Repeat,
  Disabled: Disabled,
  Include: Include,
  Value: Value
}
