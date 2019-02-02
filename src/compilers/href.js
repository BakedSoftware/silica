goog.module('compilers.href')

/** @this Element */
function Href (ctx, value) {
  if (value !== undefined) {
    this.setAttribute('href', value)
  } else {
    var nodes = Silica.query(this, '[data-href]')
    var node
    for (let i = nodes.length - 1; i >= 0; --i) {
      node = nodes[i]
      let property = node.dataset['href']
      Silica.observer.register(node, property, Href)
      node.setAttribute('href', Silica.getValue(node, property))
    }
  }
  Silica._capture_links(this)
}

exports = Href
