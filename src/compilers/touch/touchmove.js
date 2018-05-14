goog.module('compilers.touch.move')

function TouchMove () {
  var nodes = Silica.query(this, '[data-touchmove]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.ontouchmove = function (evt) {
      Silica._call(this, evt, 'touchmove')
    }
  }
}

exports = TouchMove
