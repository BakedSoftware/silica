goog.module('watchers.class')

function updater (element) {
  var hardClass = element.dataset._rt_hard_klass || ''
  var klass = Silica.getValue(element, element.dataset['class'], null, [element, element.dataset['parameter']])
  if (klass) {
    if (klass instanceof Array) {
      if (hardClass === '') {
        if (element.classList.length !== klass.length) {
          element.className = hardClass
          element.classList.add.apply(element.classList, klass)
        } else {
          let applied = false
          for (let k of klass) {
            if (!element.classList.contains(k)) {
              element.className = hardClass
              element.classList.add.apply(element.classList, klass)
              applied = true
              break
            }
          }
          if (!applied) {
            for (let k of element.classList.values()) {
              if (!klass.includes(k)) {
                element.className = hardClass
                element.classList.add.apply(element.classList, klass)
                applied = true
                break
              }
            }
          }
        }
      }
    } else if (klass === '') {
      element.className = hardClass
    } else if (!element.classList.contains(klass)) {
      element.className = hardClass
      element.classList.add(klass)
    }
  }

  if (element.dataset['show'] != null) {
    var key = element.dataset['show']
    var negate = key[0] === '!'
    let isVisible = Silica._show(element, key, negate)
    if (isVisible && element.classList.contains('hidden')) {
      element.classList.remove('hidden')
    } else {
      if (!isVisible && !element.classList.contains('hidden')) {
        element.classList.add('hidden')
      }
    }
  }
}

/** @this Element */
function Class () {
  var elements = Silica.query(this, '[data-class]')
  if (this.dataset['class']) {
    updater(this)
  }
  for (var i = elements.length - 1; i >= 0; --i) {
    updater(elements[i])
  }
}

exports = Class
