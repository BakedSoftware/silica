goog.module('compilers.srcset')

function defaultSrcSetForNode (node) {
  switch (node.nodeName) {
    case 'IMG': return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    default: return ''
  }
}

/** @this Element */
function SrcSetUpdater (_, value) {
  if (value !== this.src) {
    this.setAttribute('srcset', value || defaultSrcSetForNode(this))
  }
}

/** @this Element */
function SrcSet (ctx, value) {
  var nodes = Silica.query(this, '[data-srcset]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    let property = node.dataset['srcset']
    Silica.observer.register(node, property, SrcSetUpdater)
  }
}

exports = SrcSet
