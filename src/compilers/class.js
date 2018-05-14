goog.module('compilers.class')

/** @this Element */
function Class () {
  var nodes = Silica.query(this, '[data-class]')
  var node
  var klass

  if (this.nodeType !== 9 && this.dataset['class']) {
    if (this.dataset._rt_hard_klass == null) {
      this.dataset._rt_hard_klass = this.className
    }
    klass = Silica.getValue(this, this.dataset['class'], null, null)
    if (klass) {
      this.classList.add(klass)
    }
  }

  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    if (node.dataset._rt_hard_klass == null) {
      node.dataset._rt_hard_klass = node.className.split('hidden').join(' ').trim()
    }
    klass = Silica.getValue(node, node.dataset['class'], null, [node, node.dataset['parameter']])
    if (klass) {
      node.classList.add(klass)
    }
  }
}

exports = Class
