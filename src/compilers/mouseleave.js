goog.module('compilers.mouseleave')

function MouseLeave () {
  var nodes = Silica.query(this, '[data-mouseleave]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onmouseleave = function (evt) {
      Silica._call(this, evt, 'mouseleave')
    }
  }
}

exports = MouseLeave
