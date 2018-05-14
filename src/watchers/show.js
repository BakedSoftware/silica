goog.module('watchers.show')

/** @this Element */
function Show () {
  var element, elements, i, isVisible, k, negate
  elements = Silica.query(this, '[data-show]')
  if (this.dataset['show']) {
    if (elements.length === 0) {
      elements = [this]
    } else {
      let a = []
      for (i = elements.length - 1; i >= 0; i--) {
        a[i] = elements[i]
      }
      elements = a
    }
  }
  for (i = elements.length - 1; i >= 0; i--) {
    element = elements[i]
    if (!Silica.isInDOM(element)) {
      continue
    }

    k = element.dataset['show']
    negate = k[0] === '!'
    if (negate) {
      k = k.substr(1)
    }

    isVisible = Silica._show(element, k, negate)
    if (isVisible && element.classList.contains('hidden')) {
      element.classList.remove('hidden')
    } else {
      if (!isVisible && !element.classList.contains('hidden')) {
        element.classList.add('hidden')
      }
    }
  }
}

exports = Show
