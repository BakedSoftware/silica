goog.module('compilers.value')

function Value () {
  var nodes = Silica.query(this, '[data-value]')
  var node
  var property
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    property = node.dataset['value']
    node.setAttribute('value', Silica.getValue(node, property))
  }
}

exports = Value
