goog.module('compilers.touch.cancel')

function TouchCancel () {
  var nodes = Silica.query(this, '[data-touchcancel]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.ontouchcancel = function (evt) {
      Silica._call(this, evt, 'touchcancel')
    }
  }
}

exports = TouchCancel
