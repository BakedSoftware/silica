goog.module('compilers.mouseover')

function MouseOver () {
  var nodes = Silica.query(this, '[data-mouseover]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onmouseover = function (evt) {
      Silica._call(this, evt, 'mouseover')
    }
  }
}

exports = MouseOver
