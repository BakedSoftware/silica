goog.module('compilers')

const Directives = goog.require('compilers.directives')
const If = goog.require('compilers.if')
const Show = goog.require('compilers.show')
const Class = goog.require('compilers.class')
const Disabled = goog.require('compilers.disabled')
const Href = goog.require('compilers.href')
const Style = goog.require('compilers.style')
const Include = goog.require('compilers.include')
const Controller = goog.require('compilers.controller')
const Click = goog.require('compilers.click')
const ClickOutside = goog.require('compilers.clickoutside')
const DoubleClick = goog.require('compilers.double_click')
const Blur = goog.require('compilers.blur')
const Focus = goog.require('compilers.focus')
const Model = goog.require('compilers.model')
const Submit = goog.require('compilers.submit')
const Src = goog.require('compilers.src')
const Scroll = goog.require('compilers.scroll')
const ScrollFinished = goog.require('compilers.scroll_finished')
const Value = goog.require('compilers.value')
const Generic = goog.require('compilers.generic')
const Load = goog.require('compilers.load')

// Mouse Events
const MouseDown = goog.require('compilers.mousedown')
const MouseEnter = goog.require('compilers.mouseenter')
const MouseLeave = goog.require('compilers.mouseleave')
const MouseMove = goog.require('compilers.mousemove')
const MouseOut = goog.require('compilers.mouseout')
const MouseOver = goog.require('compilers.mouseover')
const MouseUp = goog.require('compilers.mouseup')
const MouseWheel = goog.require('compilers.mousewheel')

// Key Events
const KeyDown = goog.require('compilers.keydown')
const KeyUp = goog.require('compilers.keyup')
// Touch Events
const TouchStart = goog.require('compilers.touch.start')
const TouchCancel = goog.require('compilers.touch.cancel')
const TouchEnd = goog.require('compilers.touch.end')
const TouchMove = goog.require('compilers.touch.move')

exports = {
  '1_Directive': Directives,
  _if: If,
  '2_Value': Value,
  Show: Show,
  Class: Class,
  Disabled: Disabled,
  Href: Href,
  Style: Style,
  Include: Include,
  Controller: Controller,
  Click: Click,
  ClickOutside: ClickOutside,
  DoubleClick: DoubleClick,
  Blur: Blur,
  Focus: Focus,
  Submit: Submit,
  Src: Src,
  Scroll: Scroll,
  ScrollFinished: ScrollFinished,
  Generic: Generic,
  Model: Model,
  Load: Load,
  // Mouse Events
  MouseDown: MouseDown,
  MouseUp: MouseUp,
  MouseOut: MouseOut,
  MouseMove: MouseMove,
  MouseWheel: MouseWheel,
  MouseLeave: MouseLeave,
  MouseEnter: MouseEnter,
  MouseOver: MouseOver,
  // Key Events
  KeyDown: KeyDown,
  KeyUp: KeyUp,
  // Touch Events
  TouchStart: TouchStart,
  TouchCancel: TouchCancel,
  TouchEnd: TouchEnd,
  TouchMove: TouchMove
}
