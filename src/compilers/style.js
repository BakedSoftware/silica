goog.module('compilers.style')

function Style () {
  var nodes = Silica.query(this, '[data-style]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node.setAttribute('style', Silica.getValue(node, node.dataset['style']))
  }
}

exports = Style
