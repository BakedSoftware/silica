goog.module('compilers.style')

/** @this Element */
function Style (ctx, value) {
  if (value !== undefined) {
    this.setAttribute('style', value)
  } else {
    var nodes = Silica.query(this, '[data-style]')
    var node
    for (let i = nodes.length - 1; i >= 0; --i) {
      node = nodes[i]
      let property = node.dataset['style']
      Silica.observer.register(node, property, Style)
      node.setAttribute('style', Silica.getValue(node, property))
    }
  }
}

exports = Style
