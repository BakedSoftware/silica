goog.module('compilers.mousedown')

function MouseDown () {
  var nodes = Silica.query(this, '[data-mousedown]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onmousedown = function (evt) {
      Silica._call(this, evt, 'mousedown')
    }
  }
}

exports = MouseDown
