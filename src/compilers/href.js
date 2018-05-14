goog.module('compilers.href')

function Href () {
  var nodes = Silica.query(this, '[data-href]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node.setAttribute('href', Silica.getValue(node, node.dataset['href']))
  }
  Silica._capture_links(this)
}

exports = Href
