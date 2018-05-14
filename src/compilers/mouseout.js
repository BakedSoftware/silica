goog.module('compilers.mouseout')

function MouseOut () {
  var nodes = Silica.query(this, '[data-mouseout]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onmouseout = function (evt) {
      Silica._call(this, evt, 'mouseout')
    }
  }
}

exports = MouseOut
