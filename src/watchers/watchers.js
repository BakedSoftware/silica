goog.module('watchers')

const _If = goog.require('watchers.if')
const Repeat = goog.require('watchers.repeat')
const Show = goog.require('watchers.show')
const Class = goog.require('watchers.class')
const Model = goog.require('watchers.model')
// The following just need to call their compiler
const Disabled = goog.require('compilers.disabled')
const Href = goog.require('compilers.href')
const Style = goog.require('compilers.style')
const Src = goog.require('compilers.src')
const Generic = goog.require('compilers.generic')
const Include = goog.require('compilers.include')
const Value = goog.require('compilers.value')

exports = {
  _If: _If,
  Repeat: Repeat,
  Show: Show,
  Class: Class,
  Model: Model,
  Disabled: Disabled,
  Href: Href,
  Style: Style,
  Src: Src,
  Generic: Generic,
  Include: Include,
  Value: Value
}
