goog.module('compilers.mouseenter')

function MouseEnter () {
  var nodes = Silica.query(this, '[data-mouseenter]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onmouseenter = function (evt) {
      Silica._call(this, evt, 'mouseenter')
    }
  }
}

exports = MouseEnter
