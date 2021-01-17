goog.module('compilers')

const Directives = goog.require('compilers.directives')
const If = goog.require('compilers.if')
const Show = goog.require('compilers.show')
const Class = goog.require('compilers.class')
const Include = goog.require('compilers.include')
const Controller = goog.require('compilers.controller')
const Model = goog.require('compilers.model')
const ClickOutside = goog.require('compilers.clickoutside')
const Src = goog.require('compilers.src')
const SrcSet = goog.require('compilers.srcset')
const Generic = goog.require('compilers.generic')
const ScrollFinished = goog.require('compilers.scroll_finished')

// Generic Event
const Event = goog.require('compilers.event')

exports = {
  '1_Directive': Directives,
  _if: If,
  Show: Show,
  Class: Class,
  Include: Include,
  Controller: Controller,
  ClickOutside: ClickOutside,
  Src: Src,
  SrcSet: SrcSet,
  ScrollFinished: ScrollFinished,
  Generic: Generic,
  Model: Model.Compiler,
  Event: Event
}
