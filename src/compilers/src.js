goog.module('compilers.src')

function defaultSrcForNode (node) {
  switch (node.nodeName) {
    case 'IMG': return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    default: return ''
  }
}

/** @this Element */
function SrcUpdater (_, value) {
  if (value !== this.src) {
    this.setAttribute('src', value || defaultSrcForNode(this))
  }
}

/** @this Element */
function Src (ctx, value) {
  var nodes = Silica.query(this, '[data-src]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    let property = node.dataset['src']
    Silica.observer.register(node, property, SrcUpdater)
  }
}

exports = Src
