goog.module('compilers.mousemove')

function MouseMove () {
  var nodes = Silica.query(this, '[data-mousemove]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onmousemove = function (evt) {
      Silica._call(this, evt, 'mousemove')
    }
  }
}

exports = MouseMove
