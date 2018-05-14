goog.module('compilers.mouseup')

function MouseUp () {
  var nodes = Silica.query(this, '[data-mouseup]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onmouseup = function (evt) {
      Silica._call(this, evt, 'mouseup')
    }
  }
}

exports = MouseUp
