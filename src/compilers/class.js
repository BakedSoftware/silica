goog.module('compilers.class')

var getClassList = null

if (DOMTokenList && DOMTokenList.prototype.values) {
  getClassList = function (e) { return e.classList.values() }
} else {
  getClassList = function (e) { return e.className.split(' ') }
}

function updater (element, value) {
  var hardClass = element.dataset._rt_hard_klass || ''
  var klass = value
  if (!(klass instanceof Array)) {
    klass = klass === '' ? [] : [klass]
  }

  if (element.dataset['show'] != null && element.classList.contains('hidden')) {
    klass.push('hidden')
  }

  // Different lengths, just reset and apply all new
  if (element.classList.length !== klass.length) {
    element.className = hardClass
    element.classList.add.apply(element.classList, klass)
  } else {
    let applied = false
    // Look for missing classes on the element, reset and apply all new if found
    for (let k of klass) {
      if (!element.classList.contains(k)) {
        element.className = hardClass
        element.classList.add.apply(element.classList, klass)
        applied = true
        break
      }
    }
    if (!applied) {
      // Look for classes which should no longer be attached
      for (let k of getClassList(element)) {
        if (!klass.includes(k)) {
          element.className = hardClass
          element.classList.add.apply(element.classList, klass)
          break
        }
      }
    }
  }
}

/** @this Element */
function Class (ctx, value) {
  if (value !== undefined) {
    updater(this, value)
    return
  }
  var nodes = Silica.query(this, '[data-class]')

  if (this.nodeType !== 9 && this.dataset['class']) {
    if (this.dataset._rt_hard_klass == null) {
      this.dataset._rt_hard_klass = this.className.split('hidden').join(' ').trim()
    }
    let property = this.dataset['class']
    Silica.observer.register(this, property, Class)
    this.onremove = function () {
      Silica.observer.deregister(this, property, Class)
    }
  }

  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    if (node.dataset._rt_hard_klass == null) {
      node.dataset._rt_hard_klass = node.className.split('hidden').join(' ').trim()
    }
    let property = node.dataset['class']
    Silica.observer.register(node, property, Class)
    node.onremove = function () {
      Silica.observer.deregister(this, property, Class)
    }
  }
}

exports = Class
