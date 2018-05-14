goog.module('compilers.double_click')

function DoubleClick () {
  var nodes = Silica.query(this, '[data-dblclick]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.ondblclick = function (evt) {
      Silica._call(this, evt, 'dblclick')
    }
  }
}

exports = DoubleClick
